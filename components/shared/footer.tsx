import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-black py-2">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-8">
        <div className="mb-4 md:mb-0">
          <h2 className="text-3xl font-bold">UARENT</h2>
        </div>
        <div className="flex flex-col md:flex-row mb-4 md:mb-0">
          <a href="/about" className="mx-2 hover:text-gray-400">
            About Us
          </a>
          <a href="/services" className="mx-2 hover:text-gray-400">
            Services
          </a>
          <a href="/contact" className="mx-2 hover:text-gray-400">
            Contact
          </a>
          <a href="/faq" className="mx-2 hover:text-gray-400">
            FAQ
          </a>
        </div>
        <div className="flex flex-col md:flex-row mb-4 md:mb-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2 hover:text-gray-400">
            <i className="fab fa-facebook-f"></i> Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mx-2 hover:text-gray-400">
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2 hover:text-gray-400">
            <i className="fab fa-instagram"></i> Instagram
          </a>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>&copy; 2025 UARENT. All rights reserved.</p>
      </div>
    </footer>
  );
};
