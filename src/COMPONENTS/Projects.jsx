import React from "react";
import { usePortfolio } from "./usePortfolio";
import './Projects.css';

function Projects() {
  console.log("✅ Projects component mounted"); // 👈 add this

  const { portfolio, loading } = usePortfolio();

  if (loading) return <div>Loading projects...</div>;
  if (!portfolio) return <div>No projects found.</div>;

  const projectsArray = portfolio.projects
    ? portfolio.projects.split(",").map((proj) => proj.trim())
    : [];

  return (
    <div className="projects-container" style={{ marginTop: "50px" }}>
      <h1>Projects</h1>
      {projectsArray.length > 0 ? (
        <ul className="projects-list">
          {projectsArray.map((project, index) => (
            <li key={index} className="project-item">
              {project}
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects listed.</p>
      )}
    </div>
  );
}

export default Projects;
