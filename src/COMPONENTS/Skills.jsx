import React from "react";
import { usePortfolio } from "./usePortfolio";
import './Skills.css';

function Skills() {
  const { portfolio, loading } = usePortfolio();

  if (loading) return <div>Loading skills...</div>;
  if (!portfolio) return <div>No skills found.</div>;

  // Split skills string into array
  const skillsArray = portfolio.skills
    ? portfolio.skills.split(",").map((skill) => skill.trim())
    : [];

  return (
    <div className="skills-container" style={{ marginTop: "50px" }}>
      <h1>Skills</h1>
      {skillsArray.length > 0 ? (
        <div className="skills-list">
          {skillsArray.map((skill, index) => (
            <span key={index} className="skill-item">
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p>No skills listed.</p>
      )}
    </div>
  );
}

export default Skills;
