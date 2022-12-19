import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/discover.css';

const DisplayProject = ({
    projects,
    category,
    projectCount,
    formatNumber,
}) => {

    const navigate = useNavigate();

    return (
        <div className="discover-projects-container">
            {
                projects.length > 0 ?
                    <div className="displayed-projects-heading">
                        Explore {projectCount} projects
                    </div>
                    :
                    <div className="displayed-projects-heading">
                        Loading...
                    </div>
            }
            {
                projects.map((project) => {
                    return (
                        <div 
                            className="displayed-project-container" 
                            key={project.id}
                            onClick={() => {
                                sessionStorage.setItem("currentProjectId", project.documentId);
                                navigate(`/projects/${project.documentId}`);
                            }}
                        >
                            <div className="displayed-project-image">
                                <img
                                    src={project.projectImageUrl}
                                    className="displayed-image"
                                />
                            </div>
                            <div className="displayed-project-info">
                                <div className="displayed-project-name">
                                    {project.projectTitle}
                                </div>
                                <div className="displayed-project-desc">
                                    {project.projectDescription}
                                </div>
                                <div className="displayed-project-info-container">
                                    <div className="displayed-project-by">
                                        By: {project.createdBy}
                                    </div>
                                    <div className="displayed-project-funded">
                                        ${formatNumber(project.moneyBacked)} pledged
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default DisplayProject;