import { useState } from "react";
import { addReview } from "../../services/review.service.jsx";

function CafeReviewForm({ onClose, cafeId, cafeName, setReviewsUpdated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await addReview(cafeId, name, description);
      setName("");
      setDescription("");
      setReviewsUpdated(true);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = !name.trim() || !description.trim();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="modal bg-white w-11/12 md:w-5/6 rounded-lg shadow-lg p-6 relative z-20">
        {submitted ? (
          <div>
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
              <h2 className="text-xl font-light pb-2 text-center mt-1">
                Thank you for your review!
              </h2>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-light pb-2 text-center">{cafeName}</h2>
            <div className="border border-gray-300 border-opacity-50 border- mb-2 w-3/4 mx-auto"></div>
            <p className="text-sm font-light text-gray-500 pb-4">
              Share your experience with us
            </p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="name" className="text-sm font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="border border-gray-300 rounded-lg py-2 px-3 w-full text-sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="text-sm font-semibold"
                  >
                    Review
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="border border-gray-300 rounded-lg py-2 px-3 w-full h-32 text-sm"
                    placeholder="Share some details about your experience"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <label className="text-sm font-semibold">
                    Upload a Photo
                  </label>
                  <div className="flex items-center border border-gray-300 rounded">
                    <input
                      type="text"
                      value={image ? image.name : "No file chosen"}
                      className="relative flex-grow p-2 text-gray-700 text-sm bg-white rounded-l focus:outline-none"
                      readOnly
                    />
                    {image && (
                      <svg
                      onClick={handleRemoveImage}
                      className="w-2 h-2 mt-0.5 absolute left-44 text-gray-500 hover:text-gray-700"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                      />
                    </svg>
                
                    )}
                    <input
                      type="file"
                      id="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      required
                    />
                    <label
                      htmlFor="file"
                      className="bg-blue-500 text-sm text-white py-2 px-4 rounded-r cursor-pointer"
                    >
                      Browse
                    </label>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className={`bg-orange-500 text-white text-sm px-4 py-2 rounded-lg ${
                      isButtonDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "bg-orange-500 cursor-pointer"
                    }`}
                    disabled={isButtonDisabled || loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                  <button
                    onClick={onClose}
                    className="text-orange-500 text-sm px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
                {error && (
                  <div className="text-red-500 text-sm font-semibold">
                    {error}
                  </div>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default CafeReviewForm;
