import * as Styled from '../../../styles/ExploreProjects.Styled';

const ExploreProjects = ({
    navigate,
    popularProjects,
    calculateProgress,
}) => {
    return (
        <Styled.Container>
            <Styled.Title>
                Discover popular projects
            </Styled.Title>
            <Styled.Projects>
                {
                    popularProjects.map((project, i) => {
                        if (i === 0) {
                            return (
                                <Styled.Project
                                    key={project.documentId}
                                    onClick={() => {
                                        sessionStorage.setItem("currentProjectId", project.documentId);
                                        navigate(`/projects/${project.documentId}`);
                                    }}
                                >
                                    <Styled.ProjectImageContainer>
                                        <Styled.ProjectImage
                                            src={project.projectImageUrl}
                                        />
                                    </Styled.ProjectImageContainer>
                                    <Styled.ProjectInfo>
                                        <Styled.ProjectHeading>
                                            <Styled.ProjectName>
                                                {project.projectTitle}
                                            </Styled.ProjectName>
                                            <Styled.ProjectDesc>
                                                {project.projectDescription}
                                            </Styled.ProjectDesc>
                                        </Styled.ProjectHeading>
                                        <Styled.MadeBy>
                                            By: {project.createdBy}
                                        </Styled.MadeBy>
                                        <Styled.Percent>
                                            {calculateProgress(project.fundingGoal, project.moneyBacked)}%
                                            funded
                                        </Styled.Percent>
                                    </Styled.ProjectInfo>
                                </Styled.Project>
                            );
                        }
                    })
                }
                <Styled.SplitProjects>
                    {
                        popularProjects.map((project, i) => {
                            if (i === 1 || i === 2) {
                                return (
                                    <Styled.SplitProject
                                        key={project.documentId}
                                        onClick={() => {
                                            sessionStorage.setItem("currentProjectId", project.documentId);
                                            navigate(`/projects/${project.documentId}`);
                                        }}
                                    >
                                        <Styled.ProjectImageContainer>
                                            <Styled.ProjectImage src={project.projectImageUrl} />
                                        </Styled.ProjectImageContainer>
                                        <Styled.SplitProjectInfo>
                                            <Styled.ProjectHeading>
                                                <Styled.SplitProjectName>
                                                    {project.projectTitle}
                                                </Styled.SplitProjectName>
                                            </Styled.ProjectHeading>
                                            <Styled.MadeBy>
                                                By: {project.createdBy}
                                            </Styled.MadeBy>
                                            <Styled.Percent>
                                                {calculateProgress(project.fundingGoal, project.moneyBacked)}%
                                                funded
                                            </Styled.Percent>
                                        </Styled.SplitProjectInfo>
                                    </Styled.SplitProject>
                                );
                            }
                        })
                    }
                </Styled.SplitProjects>

            </Styled.Projects>
        </Styled.Container>
    );
}

export default ExploreProjects;