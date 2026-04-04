"use client";

import { useState } from "react";

function ResetPasswordForm({onSubmit, loading, error, success}) {
    const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    // const [localError, setLocalError] = useState("");
    

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };

    // const handleConfirmPasswordChange = (e) => {
    //     setConfirmPassword(e.target.value);
    // }
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // // ✅ check passwords match
        // if (password !== confirmPassword) {
        //   setLocalError("Passwords do not match");
        //   return;
        // }
    
        // setLocalError("");
        onSubmit(password); // ✅ pass password to parent
      };

      return (
        <form onSubmit={handleSubmit}>
        <div className="space-y-2">
        <label
           htmlFor="password"
           className="block text-sm font-medium leading-6 text-gray-900"
         >
           
         </label>
         <div className="mt-2">
         <label className="block text-sm font-medium text-gray-900">
          Password
        </label>
         <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              value={password}
              onChange={handlePasswordChange}
            />
         </div>
        {/* <div className="mt-4">
        <label className="block text-sm font-medium text-gray-900">
          Confirm Password
        </label>
        <input
          type="password"
          required
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </div> */}
        </div>
        <div className="mt-4">
         <button
           type="submit"
           disabled={loading}
           className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
         >
             {loading ? "Saving..." : "Save and Login"}
         </button>
       </div>
       {success && (
        <div
          id="alert-border-3"
          className="mt-6 flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div className="ms-3 text-sm font-medium">
            Logging in ...
          </div>
        </div>
      )}
      {error && (
        <div
          id="alert-border-2"
          className="mt-6 flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div className="ms-3 text-sm font-medium">
            {error}
          </div>
        </div>
        )}
       </form>
      )

}

export default ResetPasswordForm;