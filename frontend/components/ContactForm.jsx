function ContactForm() {
  return (
    <div className="bg-white px-4">
      <h1 className="text-3xl font-semibold text-center tracking-wide text-gray-700 pt-4">
        Contact<em className="font-light pl-2.5">Us.</em>
      </h1>
      <p className="text-center text-gray-600 py-4">
        We'd love to hear from you!
      </p>
      <form className="pb-4 max-w-md mx-auto">
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
              className="w-full border border-gray-300  p-2 mt-1 bg-gray-50 text-sm"
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
              className="w-full border border-gray-300  p-2 mt-1  bg-gray-50 text-sm"
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
            className="w-full border border-gray-300  p-2 mt-2  bg-gray-50 text-sm"
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
            className="w-full border border-gray-300 p-2 mt-1  bg-gray-50 text-sm"
            required
          />
        </div>
        <div className="flex justify-center mt-4">
          <button type="submit" className="bg-gray-700 px-6 py-3 text-white hover:bg-gray-600">Send</button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
