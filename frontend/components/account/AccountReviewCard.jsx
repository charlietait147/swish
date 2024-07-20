import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import { useState } from "react";

import AccountEditReviewForm from "./AccountEditReviewForm";
import AccountDeleteReviewModal from "./AccountDeleteReviewModal";

function AccountReviewCard({ review, setReviewsUpdated }) {
  const [openReviewForm, setOpenReviewForm] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const handleEditClick = () => {
    setOpenReviewForm(true);
  };

  const handleClose = () => {
    setOpenReviewForm(false);
    setReviewsUpdated((prev) => !prev);
  };

  const handleDeleteClick = () => {
    setOpenConfirmDelete(true);
  };

  const handleModalClose = () => {
    setOpenConfirmDelete(false);
  };

  return (
    <div className="bg-white border border-gray-300 py-4 px-4 flex flex-col rounded-lg shadow-md">
      <div className="flex flex-row justify-between items-center pb-1.5">
        <div className="flex flex-row ">
          <p className="text-gray-800 text-sm font-semibold">
            @ {review.cafe.name}
          </p>
        </div>
        <p className="text-gray-400 text-xs">
          {formatDistanceToNowStrict(review.timestamp)} ago
        </p>
      </div>
      <p className="text-gray-800 text-xs font-light">{review.description}</p>
      <div className="flex flex-row justify-end pt-3">
        <button
          onClick={handleEditClick}
          className="text-xs font-semibold bg-blue-500 text-white p-2"
        >
          Edit
        </button>
        <button
          onClick={handleDeleteClick}
          className="text-xs font-semibold bg-red-500 text-white p-2 ml-2"
        >
          Delete
        </button>
        {openConfirmDelete && (
          <AccountDeleteReviewModal
            onClose={handleModalClose}
            reviewId={review._id}
            setReviewsUpdated={setReviewsUpdated}
          />
        )}
      </div>
      {openReviewForm && (
        <AccountEditReviewForm
          cafeName={review.cafe.name}
          reviewId={review._id}
          reviewName={review.name}
          reviewDescription={review.description}
          onClose={handleClose}
          setReviewsUpdated={setReviewsUpdated}
        />
      )}
    </div>
  );
}

export default AccountReviewCard;
