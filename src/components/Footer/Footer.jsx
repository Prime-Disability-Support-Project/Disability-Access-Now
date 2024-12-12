import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      &copy; 2024 Disability Access Now | <Link to="/contact">Contact Us</Link>
    </footer>
  );
}

export default Footer;
