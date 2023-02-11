const ExploreProjects = ({
    navigate,
    popularProjects,
    calculateProgress,
}) => {
    return (
        <div className="most-popular-container">
            <div className="most-popular-title">
                Discover popular projects
            </div>
            <div className="popular-projects-container">
                <div className="main-project-container">
                    {
                        popularProjects.map((project, i) => {
                            if (i === 0) {
                                return (
                                    <div
                                        className="main-project"
                                        key={project.documentId}
                                        onClick={() => {
                                            sessionStorage.setItem("currentProjectId", project.documentId);
                                            navigate(`/projects/${project.documentId}`);
                                        }}
                                    >
                                        <div className="main-project-img-container">
                                            <img
                                                src={project.projectImageUrl}
                                                className="main-project-img"
                                            />
                                        </div>
                                        <div className="main-project-info">
                                            <div className="main-project-heading">
                                                <div className="main-project-name">
                                                    {project.projectTitle}
                                                </div>
                                                <div className="main-project-desc">
                                                    {project.projectDescription}
                                                </div>
                                            </div>
                                            <div className="main-project-made-by">
                                                By: {project.createdBy}
                                            </div>
                                            <div className="percent-funded">
                                                {calculateProgress(project.fundingGoal, project.moneyBacked)}%
                                                funded
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })
                    }
                </div>
                <div className="side-projects-container">
                    {
                        popularProjects.map((project, i) => {
                            if (i > 0 && i <= 3) {
                                return (
                                    <div
                                        className="side-project"
                                        key={project.documentId}
                                        onClick={() => {
                                            sessionStorage.setItem("currentProjectId", project.documentId);
                                            navigate(`/projects/${project.documentId}`);
                                        }}
                                    >
                                        <div className="side-project-img-container">
                                            <img
                                                src={project.projectImageUrl}
                                                className="side-project-img"
                                            />
                                        </div>
                                        <div className="side-project-info">
                                            <div className="side-project-heading">
                                                <div className="side-project-name">
                                                    {project.projectTitle}
                                                </div>
                                                <div className="side-project-made-by">
                                                    By: {project.createdBy}
                                                </div>
                                            </div>
                                            <div className="side-project-percent">
                                                {calculateProgress(project.fundingGoal, project.moneyBacked)}%
                                                funded
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default ExploreProjects;