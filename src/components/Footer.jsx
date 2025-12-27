import React from "react";

const Footer = () => {
  return (
    <footer className="py-14 px-2 border-t-2 border-gray-800">
      <div className="container mx-auto flex flex-col items-center space-y-6 md:flex-row">
        {/* Grid Columns */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pb-6">
          {/* Column 1 */}
          <div className="flex flex-col items-start space-y-2">
            <h3 className="text-lg font-bold">Support</h3>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              FAQ
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              Help Center
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              Community Guidelines
            </a>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-start space-y-2">
            <h3 className="text-lg font-bold">Company</h3>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              Blogs
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              About Us
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              Contact
            </a>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col items-start space-y-2">
            <h3 className="text-lg font-bold">Legal</h3>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              Disclaimer
            </a>
          </div>

          {/* Column 4 */}
          <div className=" w-full flex flex-col justify-center items-center gap-4 pt-4">
            {/* Copyright */}
            <div className="flex justify-center items-center gap-4 pt-4">
              <p className="text-gray-400">&copy; 2025</p>
              <p className="text-gray-400">All Rights Reserved</p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-500">
                {/* Facebook */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988h-2.54V12h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500">
                {/* Instagram */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-2a1.5 1.5 0 11-3.001.001A1.5 1.5 0 0116.5 7z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                {/* Twitter/X */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 001.88-2.36 8.59 8.59 0 01-2.72 1.04 4.25 4.25 0 00-7.24 3.88A12.06 12.06 0 013 4.79a4.25 4.25 0 001.32 5.67 4.22 4.22 0 01-1.93-.53v.05a4.25 4.25 0 003.41 4.17 4.3 4.3 0 01-1.92.07 4.25 4.25 0 003.97 2.95A8.52 8.52 0 012 19.54a12.04 12.04 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.39-.01-.58A8.72 8.72 0 0022.46 6z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
