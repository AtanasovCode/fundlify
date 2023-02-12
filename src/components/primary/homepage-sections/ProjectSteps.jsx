import * as Styled from '../../../styles/ProjectSteps.Styled';

const ProjectSteps = ({ }) => {
    return (
        <Styled.Container>
            <Styled.Heading>
                <Styled.Question>
                    What to expect?
                </Styled.Question>
                <Styled.Title>
                    Fundraising on Fundlify
                    takes just a few minutes
                </Styled.Title>
            </Styled.Heading>
            <Styled.StepsContainer>
                <Styled.Step>
                    <Styled.Number>
                        1
                    </Styled.Number>
                    <Styled.StepDescription>
                        <Styled.StepTitle>
                            Start with the basics
                        </Styled.StepTitle>
                        <Styled.stepSubtitle>
                            Kick things off with your product name and description
                        </Styled.stepSubtitle>
                    </Styled.StepDescription>
                </Styled.Step>
                <Styled.Step>
                    <Styled.Number>
                        2
                    </Styled.Number>
                    <Styled.StepDescription>
                        <Styled.StepTitle>
                            Describe your product
                        </Styled.StepTitle>
                        <Styled.stepSubtitle>
                            We'll guide with tips along the way
                        </Styled.stepSubtitle>
                    </Styled.StepDescription>
                </Styled.Step>
                <Styled.Step>
                    <Styled.Number>
                        3
                    </Styled.Number>
                    <Styled.StepDescription>
                        <Styled.StepTitle>
                            Share with the world
                        </Styled.StepTitle>
                        <Styled.stepSubtitle>
                            People out there want to help you
                        </Styled.stepSubtitle>
                    </Styled.StepDescription>
                </Styled.Step>
            </Styled.StepsContainer>
        </Styled.Container>
    );
}

export default ProjectSteps;