import { useEffect } from 'react';
import * as Styled from '../../../styles/ProjectStats.Styled';

const ProjectStats = ({
    backers,
    totalFundsRaised,
    totalProjects,
    formatNumber,
}) => {

    useEffect(() => {
        console.log(backers);
    }, [])

    return (
        <Styled.Container>
            <Styled.Heading>
                <Styled.Title>
                    Bring A
                    <Styled.Creative>
                        creative
                    </Styled.Creative>
                    Project To Life!
                </Styled.Title>
                <Styled.Subtitle>
                    On Fundlify:
                </Styled.Subtitle>
            </Styled.Heading>
            <Styled.Funds>
                <Styled.FundStats>
                    <Styled.FundNumber>
                        {formatNumber(totalProjects)}
                    </Styled.FundNumber>
                    <Styled.FundText>Projects Funded</Styled.FundText>
                </Styled.FundStats>
                <Styled.FundStats>
                    <Styled.FundNumber>
                        ${formatNumber(totalFundsRaised)}
                    </Styled.FundNumber>
                    <Styled.FundText>Funds Raised</Styled.FundText>
                </Styled.FundStats>
                <Styled.FundStats>
                    <Styled.FundNumber>
                        {formatNumber(backers)}
                    </Styled.FundNumber>
                    <Styled.FundText>Pledges Made</Styled.FundText>
                </Styled.FundStats>
            </Styled.Funds>
        </Styled.Container>
    );
}

export default ProjectStats;