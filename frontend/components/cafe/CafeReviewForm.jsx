function CafeReviewForm({ onClose, cafeId, cafeName }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="modal bg-white w-5/6 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-light pb-2 text-center">
          {cafeName}
        </h2>
        <div className="border border-gray-300 border-1 mb-2 w-3/4 mx-auto"></div>
        <p className="text-sm font-light text-gray-500 pb-4">
            Share your experience with us</p>
        <form>
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

              />
            </div>
            <div>
              <label htmlFor="description" className="text-sm font-semibold">
                Review
              </label>
              <textarea
                id="description"
                name="description"
                className="border border-gray-300 rounded-lg py-2 px-3 w-full h-32 text-sm"
                placeholder="Share some details about your experience"
              ></textarea>
            </div>
            <div>
              <button className="bg-orange-500 text-white text-sm px-4 py-2 rounded-lg">
                Submit
              </button>
              <button
                onClick={onClose}
                className="text-orange-500 text-sm px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CafeReviewForm;
