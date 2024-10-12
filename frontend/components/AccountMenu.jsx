import { useState, useEffect, useRef } from "react";
import Logo from "../public/logo/swish-logo.png";
import Image from "next/image";

function AccountMenu({ handleSignOut, avatarUrl }) {
  
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = (e) => {
    e.stopPropagation(); // Prevent click from closing the dropdown immediately
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false); // Close the dropdown
      }
    };

    // Add event listener to the whole document
    document.addEventListener('click', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar */}
      <div
        className="w-14 h-14 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-xl border border-gray-300 cursor-pointer"
        onClick={handleToggleDropdown}
        role="button"
        aria-label="avatar"
      >
        <Image src={`${process.env.NEXT_API_URL}/public/images/${avatarUrl}`} width={56} 
  height={56}  alt="Account Avatar" className="w-14 h-14" />
      </div>

      {/* Dropdown Menu */}
      {dropdownVisible && (
        <div
          className="absolute right-0 top-14 py-2 mt-2 w-48 bg-white rounded-lg shadow-lg z-10"
          onClick={(e) => e.stopPropagation()}
          role="menu"
        >
          <ul className="text-sm text-black flex flex-col gap-1">
            <li className="px-4 py-2 hover:bg-gray-100">
              <a href="/account">Account info</a>
            </li>
            <li
              className="px-4 py-2 font-semibold hover:bg-gray-100 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default AccountMenu;
