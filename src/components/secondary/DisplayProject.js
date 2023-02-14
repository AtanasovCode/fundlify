import { useEffect } from 'react';
import * as Styled from '../../styles/DisplayProject.Styled'
import { useNavigate, Link } from 'react-router-dom';
import FundProject from '../primary/FundProject';
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
        <Styled.Container>
            <Styled.Heading>
                Explore {projectCount} projects
            </Styled.Heading>
            {
                category === "all-categories" ?
                    projects.map((project) => {
                        return (
                            <Styled.Project
                                key={project.id}
                                onClick={() => {
                                    sessionStorage.setItem("currentProjectId", project.documentId);
                                    navigate(`/projects/${project.documentId}`);
                                }}
                            >
                                <Styled.ProjectImage>
                                    <Styled.Image
                                        src={project.projectImageUrl}
                                        alt="main image of the project"
                                    />
                                </Styled.ProjectImage>
                                <Styled.Info>
                                    <Styled.Name>
                                        {project.projectTitle}
                                    </Styled.Name>
                                    <Styled.Desc>
                                        {project.projectDescription}
                                    </Styled.Desc>
                                    <Styled.FundingInfo>
                                        <Styled.MadeBy>
                                            By: {project.createdBy}
                                        </Styled.MadeBy>
                                        <Styled.Number>
                                            ${formatNumber(project.moneyBacked)} pledged
                                        </Styled.Number>
                                        <Styled.Percent>
                                            {`${formatNumber(calculateProgress(project.fundingGoal, project.moneyBacked))}%`}
                                            <span>funded</span>
                                        </Styled.Percent>
                                    </Styled.FundingInfo>
                                </Styled.Info>
                            </Styled.Project>
                        )
                    })
                    :
                    projects.map((project) => {
                        if (project.category === category) {
                            return (
                                <Styled.Project
                                    key={project.id}
                                    onClick={() => {
                                        sessionStorage.setItem("currentProjectId", project.documentId);
                                        navigate(`/projects/${project.documentId}`);
                                    }}
                                >
                                    <Styled.ProjectImage>
                                        <Styled.Image
                                            alt="main image of the project"
                                            src={project.projectImageUrl}
                                        />
                                    </Styled.ProjectImage>
                                    <Styled.Info>
                                        <Styled.Name>
                                            {project.projectTitle}
                                        </Styled.Name>
                                        <Styled.Desc>
                                            {project.projectDescription}
                                        </Styled.Desc>
                                        <Styled.FundingInfo>
                                            <Styled.MadeBy>
                                                By: {project.createdBy}
                                            </Styled.MadeBy>
                                            <Styled.Number>
                                                ${formatNumber(project.moneyBacked)} pledged
                                            </Styled.Number>
                                            <Styled.Percent>
                                                <span className="percent-number">
                                                    {`${formatNumber(calculateProgress(project.fundingGoal, project.moneyBacked))
                                                        }`}
                                                </span>
                                                <span>% funded</span>
                                            </Styled.Percent>
                                        </Styled.FundingInfo>
                                    </Styled.Info>
                                </Styled.Project>
                            )
                        }
                    })
            }
        </Styled.Container>
    );
}

export default DisplayProject;