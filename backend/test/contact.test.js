import { expect } from "chai";
import sinon from "sinon";
import nodemailer from "nodemailer";

import { initialiseSetup } from "./testSetup.js";
import { CONTACT_EMAIL } from "../utils/email.js";

describe("Testing Requests on /contact", () => {

    const testServer = initialiseSetup();

    const wellFormedMessage = {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        message: "Hello <b>Swish</b>!",
    };

    let sendMailStub;

    beforeEach(() => {
        sendMailStub = sinon.stub().resolves();
        sinon.stub(nodemailer, "createTransport").returns({ sendMail: sendMailStub });
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("POST request to /contact", () => {
        it("should return a 200 status code and email the message to the Swish inbox", async () => {
            //Act
            const res = await testServer
                .post("/contact")
                .send(wellFormedMessage);
            //Assert
            expect(res).to.have.status(200);
            expect(sendMailStub.calledOnce).to.be.true;
            const mail = sendMailStub.firstCall.args[0];
            expect(mail.to).to.equal(CONTACT_EMAIL);
            expect(mail.to).to.equal("info@swish-discounts.com");
            expect(mail.replyTo).to.include(wellFormedMessage.email);
            expect(mail.subject).to.include("Jane Doe");
        });

        it("should escape HTML in the message", async () => {
            //Act
            await testServer
                .post("/contact")
                .send(wellFormedMessage);
            //Assert
            const mail = sendMailStub.firstCall.args[0];
            expect(mail.html).to.include("Hello &lt;b&gt;Swish&lt;/b&gt;!");
            expect(mail.html).to.not.include("<b>Swish</b>");
        });

        it("should return a 400 status code and not send an email when the email is invalid", async () => {
            //Act
            const res = await testServer
                .post("/contact")
                .send({ ...wellFormedMessage, email: "not-an-email" });
            //Assert
            expect(res).to.have.status(400);
            expect(sendMailStub.called).to.be.false;
        });

        it("should return a 400 status code when the message is missing", async () => {
            //Act
            const res = await testServer
                .post("/contact")
                .send({ ...wellFormedMessage, message: "   " });
            //Assert
            expect(res).to.have.status(400);
            expect(sendMailStub.called).to.be.false;
        });

        it("should return a 500 status code when the email fails to send", async () => {
            //Arrange
            sendMailStub.rejects(new Error("SMTP down"));
            //Act
            const res = await testServer
                .post("/contact")
                .send(wellFormedMessage);
            //Assert
            expect(res).to.have.status(500);
        });
    });
});
