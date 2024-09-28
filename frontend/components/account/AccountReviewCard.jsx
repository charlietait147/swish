import { formatDistanceToNowStrict } from "date-fns";
import { useState } from "react";
import Image from "next/image";
import PropTypes from "prop-types";

import AccountEditReviewForm from "./AccountEditReviewForm";
import AccountDeleteReviewModal from "./AccountDeleteReviewModal";

function AccountReviewCard({ cafeName, reviewDescription, reviewTimestamp, reviewImage, reviewId, setReviewsUpdated, reviewName }) {
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
   
    <div className="bg-white border border-gray-300 py-4 px-4 flex flex-col rounded-lg shadow-md h-fit mb-4  break-inside-avoid">
      <div className="flex flex-row justify-between items-center pb-1.5">
        <div className="flex flex-row">
          <p className="text-gray-800 text-sm font-semibold">
            @ {cafeName}
          </p>
        </div>
        <p className="text-gray-400 text-xs">
          {formatDistanceToNowStrict(reviewTimestamp)} ago
        </p>
      </div>
      <p className="text-gray-800 text-xs font-light">{reviewDescription}</p>
      <div className={`flex ${reviewImage ? 'flex-row justify-between' : 'flex-col'} gap-5`}>
        {reviewImage && (
          <div className="flex items-center">
            <Image
              src={`${process.env.NEXT_API_URL}/uploads/${reviewImage}`}
              height={150}
              width={150}
              alt="review photo"
              className="mt-3 border-2 border-gray-300"
            />
          </div>
        )}
        <div className="flex flex-row items-end justify-end mt-1">
          <button
            onClick={handleEditClick}
            className="text-xs font-semibold bg-blue-500 text-white p-2"
            role="button"
            aria-label="edit-review"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteClick}
            className="text-xs font-semibold bg-red-500 text-white p-2 ml-2"
            role="button"
            aria-label="delete-review"
          >
            Delete
          </button>
        </div>
      </div>
      {openConfirmDelete && (
        <AccountDeleteReviewModal
          onClose={handleModalClose}
          reviewId={reviewId}
          setReviewsUpdated={setReviewsUpdated}
        />
      )}
      {openReviewForm && (
        <AccountEditReviewForm
          cafeName={cafeName}
          reviewId={reviewId}
          reviewName={reviewName}
          reviewDescription={reviewDescription}
          onClose={handleClose}
          setReviewsUpdated={setReviewsUpdated}
        />
      )}
      
    </div>
  );
}

AccountReviewCard.propTypes = {
  cafeName: PropTypes.string.isRequired,
  reviewDescription: PropTypes.string.isRequired,
  reviewTimestamp: PropTypes.instanceOf(Date).isRequired,
  reviewImage: PropTypes.string,
  reviewId: PropTypes.string.isRequired,
  reviewName: PropTypes.string.isRequired,
  setReviewsUpdated: PropTypes.func.isRequired,
};


export default AccountReviewCard;
