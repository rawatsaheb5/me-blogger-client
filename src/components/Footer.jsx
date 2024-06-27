import React from "react";
import { Link } from "react-router-dom";
import { SiInstagram } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 lg:px-40">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h5 className="text-lg font-semibold mb-4">INFO</h5>
          <ul>
            <li className="mb-2">
              <Link to="/" className="hover:underline">
                Formats
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/" className="hover:underline">
                Compression
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/" className="hover:underline">
                Pricing
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/" className="hover:underline">
                FAQ
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/" className="hover:underline">
                Status
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-lg font-semibold mb-4">RESOURCES</h5>
          <ul>
            <li className="mb-2">
              <Link to="/" className="hover:underline">
                Developer API
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/" className="hover:underline">
                Tools
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/" className="hover:underline">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-lg font-semibold mb-4">COMPANY</h5>
          <ul>
            <li className="mb-2">
              <Link to="/" className="hover:underline">
                About Us
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/" className="hover:underline">
                Sustainability
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/" className="hover:underline">
                Terms of Service
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/" className="hover:underline">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-lg font-semibold mb-4">Follow us</h5>
          <div className="flex space-x-4">
            <Link to="https://www.linkedin.com/" className="hover:opacity-75">
              <FaLinkedin size={30} />
            </Link>
            <Link to="https://x.com/" className="hover:opacity-75">
              <FaXTwitter size={30} />
            </Link>
            <Link to="https://www.instagram.com/" className="hover:opacity-75">
              <SiInstagram size={30} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
