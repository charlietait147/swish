import { deleteReview } from "../../services/review.service.jsx";
import PropTypes from "prop-types";

function AccountDeleteReviewModal({ onClose, reviewId, setReviewsUpdated }) {
  
  const handleDelete = async () => {
    try {
      const response = await deleteReview(reviewId);
      setReviewsUpdated((prev) => !prev);
    } catch (error) {
      console.error("Error deleting review", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="modal bg-white w-3/4 sm:w-1/2 md:w-1/3 rounded-lg shadow-lg p-6 relative"
        role="alertdialog"
        aria-label="delete-review"
      >
        <h3 className="font-bold text-base">Delete this review?</h3>
        <p className="text-xs text-gray-500 pt-1">
          This action cannot be undone.
        </p>
        <div className="flex flex-row justify-end pt-4">
          <button
            onClick={onClose}
            role="button"
            aria-label="cancel"
            className="text-blue-500 text-sm px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            role="button"
            aria-label="delete"
            className="bg-red-500 text-white text-sm px-2.5 py-1 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

AccountDeleteReviewModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  reviewId: PropTypes.string.isRequired,
  setReviewsUpdated: PropTypes.func.isRequired,
};

export default AccountDeleteReviewModal;
