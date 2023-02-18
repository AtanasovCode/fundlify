import * as Styled from '../../../styles/PledgeComponent.Styled';
import { Container, Pledge, Input, Button } from '../../../styles/NoRewardsPledge.Styled';

const PledgeComponent = ({
    project,
    preventLetters,
    formatNumber,
    pledgeAmount,
    setPledgeAmount,
    handleFundProject,
    pledge,
    tier,
    reward,
    backers,
}) => {
    return (
        <Container>
            <Styled.Title>
                Pledge ${pledge}
            </Styled.Title>
            <Styled.Tier>
                {tier}
            </Styled.Tier>
            <Styled.Reward>
                {reward}
            </Styled.Reward>
            <Styled.Backers>
                {backers} backers
            </Styled.Backers>
            <Styled.Pledge>
                <Styled.Bonus>
                    Bonus support <Styled.Optional>(Optional)</Styled.Optional>
                </Styled.Bonus>
                <Pledge>
                    <Input
                        type="input"
                        placeholder="10"
                        maxLength={4}
                        onKeyPress={(e) => preventLetters(e)}
                        onChange={(e) => {
                            setPledgeAmount(e.currentTarget.value);
                        }}
                    />
                    <Button
                        type="button"
                        value={
                            pledgeAmount !== "" ?
                                `Pledge $${formatNumber(parseInt(pledge) + parseInt(pledgeAmount))}`
                                :
                                `Pledge $${formatNumber(parseInt(pledge))}`
                        }
                        onClick={() => {
                            let backersTier = "backersTierOne";
                            handleFundProject(pledge, backersTier)
                        }}
                    />
                </Pledge>
            </Styled.Pledge>
        </Container>
    );
}

export default PledgeComponent;