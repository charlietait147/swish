// import CafeReviewCard from "./CafeReviewCard";
// import CafeReviewForm from "./CafeReviewForm";
// import { useState, useEffect } from "react";
// import Link from "next/link";

// import Cookies from "js-cookie";

// function CafeReviewList({ cafe, setReviewsUpdated }) {
//   const [openReviewForm, setOpenReviewForm] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const reviewCount = cafe?.reviews?.length || 0;

//   useEffect(() => {
//     const token = Cookies.get("token");
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const handleOpenReviewForm = () => {
//     setOpenReviewForm(true);
//   };

//   return (
//     <div className="max-w-screen-lg mx-auto xs:px-6 sm:px-10 lg:pt-6 xl:px-0 px-4 pb-4 ">
//       <h3 className="text-xl font-semibold">Reviews</h3>
//       {/* <div className="flex flex-row justify-between pb-3 sm:flex-col"> */}
//       <p className="text-sm font-semibold text-gray-400 pb-3">
//         {reviewCount === 0
//           ? "No reviews yet"
//           : `${reviewCount} ${reviewCount === 1 ? "Review" : "Reviews"}`}
//       </p>
//       {!isLoggedIn ? (
//         <>
//           <Link href="/login">
//             <div className="flex flex-row items-center gap-1 pb-3">
//               <p className="text-xs font-semibold text-orange-500 hover:underline md:text-sm">
//                 Sign in to add a review
//               </p>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="size-5 text-orange-500 mt-0.5"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//           </Link>
//         </>
//       ) : (
//         <div>
//           <div className="flex flex-col justify-center gap-1 items-center pb-4 md:pb-8">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//               className="size-6"
//             >
//               <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
//               <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
//             </svg>
//             <p className="font-semibold">Write a review</p>
//             <p className="text-gray-500 text-sm">
//               What was your cafe experience like?
//             </p>

//             <button
//               onClick={handleOpenReviewForm}
//               className="bg-orange-500 text-white text-sm px-4 py-2  rounded-lg flex flex-row items-center hover:bg-orange-600 sm:w-fit mt-2"
//             >
//               Add a review
//             </button>
//           </div>
//         </div>
//       )}
//       {/* </div> */}
//       {/* <div className="flex flex-col gap-4 md:grid grid-cols-2 md:gap-16"> */}
//       <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
//         {cafe &&
//           cafe.reviews &&
//           cafe.reviews.map((review, index) => (
//             <CafeReviewCard
//               key={review._id || index}
//               timestamp={review.timestamp}
//               description={review.description}
//               name={review.name}
//               image={review.image}
//             />
//           ))}
//       </div>
//       {openReviewForm && (
//         <CafeReviewForm
//           cafeId={cafe._id}
//           cafeName={cafe.name}
//           onClose={() => {
//             setOpenReviewForm(false);
//           }}
//           setReviewsUpdated={setReviewsUpdated}
//         />
//       )}
//     </div>
//   );
// }

// export default CafeReviewList;

import CafeReviewCard from "./CafeReviewCard";
import CafeReviewForm from "./CafeReviewForm";
import { useState, useEffect } from "react";
import { disableScroll, enableScroll } from "@/utils/scroll";
import Link from "next/link";
import SignInModal from "../SignInModal";

import Cookies from "js-cookie";

function CafeReviewList({ cafe, setReviewsUpdated }) {
  const [openReviewForm, setOpenReviewForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const reviewCount = cafe?.reviews?.length || 0;

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleOpenReviewForm = () => {
    if (!isLoggedIn) {
      setShowSignInModal(true);
      disableScroll();
    } else {
      setOpenReviewForm(true);
    }
  };

  const toggleModalClose = () => {
    setShowSignInModal(false);
    enableScroll();
  };

  return (
    <div className="max-w-screen-lg mx-auto xs:px-6 sm:px-10 lg:pt-6 xl:px-0 px-4 pb-4 ">
      <h3 className="text-xl font-semibold">Reviews</h3>
      {/* <div className="flex flex-row justify-between pb-3 sm:flex-col"> */}
      <p className="text-sm font-semibold text-gray-400 pb-3">
        {reviewCount === 0
          ? "No reviews yet"
          : `${reviewCount} ${reviewCount === 1 ? "Review" : "Reviews"}`}
      </p>
      {showSignInModal && <SignInModal toggleModalClose={toggleModalClose} />}
      {/* {!isLoggedIn ? ( */}
      <>
        {/* <Link href="/login">
            <div className="flex flex-row items-center gap-1 pb-3">
              <p className="text-xs font-semibold text-orange-500 hover:underline md:text-sm">
                Sign in to add a review
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-orange-500 mt-0.5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Link> */}
      </>
      {/* ) : ( */}
      <div>
        <div className="flex flex-col justify-center gap-1 items-center pb-4 md:pb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
          </svg>
          <p className="font-semibold">Write a review</p>
          <p className="text-gray-500 text-sm">
            What was your cafe experience like?
          </p>

          <button
            onClick={handleOpenReviewForm}
            className="bg-orange-500 text-white text-sm px-4 py-2  rounded-lg flex flex-row items-center hover:bg-orange-600 sm:w-fit mt-2"
          >
            Add a review
          </button>
        </div>
      </div>
      {/* )} */}
      {/* </div> */}
      {/* <div className="flex flex-col gap-4 md:grid grid-cols-2 md:gap-16"> */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {cafe &&
          cafe.reviews &&
          cafe.reviews.map((review, index) => (
            <CafeReviewCard
              key={review._id || index}
              timestamp={review.timestamp}
              description={review.description}
              name={review.name}
              image={review.image}
            />
          ))}
      </div>
      {openReviewForm && (
        <CafeReviewForm
          cafeId={cafe._id}
          cafeName={cafe.name}
          onClose={() => {
            setOpenReviewForm(false);
          }}
          setReviewsUpdated={setReviewsUpdated}
        />
      )}
    </div>
  );
}

export default CafeReviewList;
