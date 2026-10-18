"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { sendContactMessage } from "@/services/contact.service";

const emptyForm = { firstName: "", lastName: "", email: "", message: "" };

function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.dataset.field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await sendContactMessage(form);
      setForm(emptyForm);
      setStatus("sent");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  return (
    <section className="overflow-hidden bg-white lg:flex" id="contact-form">
      <div className="flex items-center justify-center bg-gray-800 px-4 py-10 lg:w-1/2 lg:py-20">
        <Reveal direction="left">
          <h1 className="text-3xl font-semibold text-center tracking-wide text-white lg:text-5xl">
            Contact<em className="font-light pl-2.5">Us.</em>
          </h1>
          <p className="text-center text-gray-300 pt-4 lg:text-lg">
            We&apos;d love to hear from you!
          </p>
        </Reveal>
      </div>
      <Reveal
        direction="right"
        delay={150}
        className="px-4 py-10 lg:w-1/2 lg:py-20"
      >
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <span className="text-gray-600 font-semibold my-3">Name*</span>
        <div className="flex flex-row gap-6 pt-3">
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="first-name"
              className="text-gray-600 font-semibold text-xs"
            >
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              data-field="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 bg-gray-50 text-sm"
              required
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="last-name"
              className="text-gray-600 font-semibold text-xs"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              data-field="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1  bg-gray-50 text-sm"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="text-gray-600 font-semibold mt-3">
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            data-field="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-2  bg-gray-50 text-sm"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="message" className="text-gray-600 font-semibold mt-3">
            Message*
          </label>
          <textarea
            id="message"
            name="message"
            data-field="message"
            value={form.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1  bg-gray-50 text-sm"
            required
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-gray-800 rounded-2xl px-6 py-3 text-white hover:bg-gray-700 disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send"}
          </button>
        </div>
        <p aria-live="polite" className="text-center text-sm mt-4">
          {status === "sent" && (
            <span className="text-green-600">
              Thanks for getting in touch! We&apos;ll get back to you soon.
            </span>
          )}
          {status === "error" && <span className="text-red-600">{error}</span>}
        </p>
      </form>
      </Reveal>
    </section>
  );
}

export default ContactForm;
