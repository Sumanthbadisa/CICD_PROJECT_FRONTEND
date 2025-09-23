import React from "react";
import { usePortfolio } from "./usePortfolio"; 
import "./Contact.css";

function Contact() {
  const { portfolio, loading } = usePortfolio();

  if (loading) return <div>Loading contact info...</div>;
  if (!portfolio) return <div>No contact info found.</div>;

  console.log("Portfolio object:", portfolio); // 🔹 Debug

  const linksArray = portfolio.socialLinks
    ? portfolio.socialLinks.split(",").map(link => link.trim())
    : [];

  const links = [
    { name: "LinkedIn", url: linksArray[0] || "" },
    { name: "GitHub", url: linksArray[1] || "" },
  ].filter(link => link.url);

  return (
    <div className="contact-container">
      <h1>Contact</h1>
      {links.length > 0 ? (
        <div className="social-links">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              {link.name}
            </a>
          ))}
        </div>
      ) : (
        <p>No social links.</p>
      )}
    </div>
  );
}

export default Contact;
