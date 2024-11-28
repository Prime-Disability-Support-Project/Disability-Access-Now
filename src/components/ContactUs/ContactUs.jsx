import React from "react";
import "./ContactUs.css";

function Contact() {
  return (
    <div>
      <div className="contact">
        <h1> Contact Us </h1>
        <h2>Disclaimer:</h2>
        <p>
          Please be aware that we are not the Social Security Administration
          (SSA) or any other government agency. We are not a healthcare
          organization and are not subject to HIPAA regulations.
        </p>
        <p>
          <strong>
            We do not handle private or sensitive information such as your full
            legal name, address, Social Security number, or any other
            confidential personal details.
          </strong>
        </p>
        <p>
          We kindly ask that you do not send any personal or private information
          to us. While we are committed to maintaining the privacy of the
          information you share, we do not make decisions regarding Social
          Security or other cases, nor do we have access to case-specific
          details or records.
        </p>
        <h3>
          contact us:<a href="mailto:admin@gmail.com">admin@gmail.com</a>
        </h3>
        <p>Thank you for your understanding.</p>
      </div>
    </div>
  );
}

export default Contact;
