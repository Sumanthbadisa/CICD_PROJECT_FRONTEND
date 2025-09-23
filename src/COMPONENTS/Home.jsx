import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./Home.css";

function Home() {
  const [portfolio, setPortfolio] = useState(null);
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const API_URL = "https://cicdprojectbackend-production.up.railway.app";

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`${API_URL}/api/portfolio/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Portfolio API response:", data);
          if (data) {
            setPortfolio(data);
          }
        } else {
          console.error("Failed to fetch portfolio");
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      }
    };

    if (userId) {
      fetchPortfolio();
    }
  }, [userId]);

  // Helper to render social links
  const renderSocialLinks = (links) => {
    if (!links) return null;

    try {
      const parsed = JSON.parse(links);
      return Object.entries(parsed).map(([key, value]) => (
        <a
          key={key}
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn"
        >
          {key}
        </a>
      ));
    } catch (err) {
      return links.split(",").map((link, idx) => {
        const trimmed = link.trim();
        let label = "Link";
        if (trimmed.includes("linkedin.com")) label = "LinkedIn";
        else if (trimmed.includes("github.com")) label = "GitHub";

        return (
          <a
            key={idx}
            href={trimmed}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
          >
            {label}
          </a>
        );
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1> {username}!</h1>
        <h2>Your Portfolio</h2>

        {portfolio ? (
          <div className="portfolio-card">
            {portfolio.imageUrl && (
              <img
                src={`${API_URL}${portfolio.imageUrl}`}
                alt="Profile"
                className="portfolio-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
            )}

            <h3>{portfolio.username}</h3>

            {portfolio.bio && (
              <p>
                <strong>Bio:</strong> {portfolio.bio}
              </p>
            )}

            {/* Skills */}
            {portfolio.skills && (
              <div className="skills-container">
                {portfolio.skills.split(",").map((skill, idx) => (
                  <div key={idx} className="skill-badge">
                    {skill.trim()}
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {portfolio.projects && (
              <div className="projects-container">
                <strong>Projects:</strong>
                <ul>
                  {portfolio.projects.split(",").map((project, idx) => (
                    <li key={idx}>{project.trim()}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Social Links */}
            <div className="social-links">
              <strong className="social-title">Social Links:</strong>
              {renderSocialLinks(portfolio.socialLinks)}
            </div>
          </div>
        ) : (
          <p>No portfolio found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
