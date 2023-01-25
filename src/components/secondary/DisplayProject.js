import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/discover.css';
import FundProject from './FundProject';
import Loading from './Loading';

const DisplayProject = ({
    projects,
    category,
    projectCount,
    formatNumber,
}) => {

    const navigate = useNavigate();

    const calculateProgress = (total, raised) => {
        let percent = 0;
        let progress = raised / total;
        if (progress > 0) {
            percent = progress * 100;
        } else {
            percent = 0;
        }
        return parseInt(Math.floor(percent));
    }

    return (
        <div className="discover-projects-container">
            {
                projects.length > 0 ?
                    <div className="displayed-projects-heading">
                        Explore {projectCount} projects
                    </div>
                    :
                    <div className="displayed-projects-loading">
                        <Loading />
                    </div>
            }
            {
                category === "all-categories" ?
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
                                        <div className="percent-pledged">
                                            <span className="percent-number">
                                                {`${formatNumber(calculateProgress(project.fundingGoal, project.moneyBacked))}%`}
                                            </span>
                                            <span>funded</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :
                    projects.map((project) => {
                        if (project.category === category) {
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
                                            <div className="percent-pledged">
                                                <span className="percent-number">
                                                    {`${formatNumber(calculateProgress(project.fundingGoal, project.moneyBacked))
                                                        }`}
                                                </span>
                                                <span>% funded</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })
            }
        </div>
    );
}

export default DisplayProject;