import * as Styled from '../../../styles/NoRewardsPledge.Styled';

const NoRewardPledge = ({
    preventLetters,
    fundNoReward,
    setFundNoReward,
    handleFundNoReward,
}) => {
    return (
        <Styled.Container>
            <Styled.Title>
                Pledge without a reward
            </Styled.Title>
            <Styled.Subtitle>
                Pledge Amount
            </Styled.Subtitle>
            <Styled.Pledge>
                <Styled.Input
                    type="text"
                    placeholder="10"
                    value={fundNoReward}
                    maxLength={4}
                    onKeyPress={(e) => preventLetters(e)}
                    onChange={(e) => {
                        setFundNoReward(e.currentTarget.value);
                    }}
                />
                <Styled.Button
                    type="button"
                    value="Pledge"
                    onClick={() => handleFundNoReward()}
                />
            </Styled.Pledge>
        </Styled.Container>
    );
}

export default NoRewardPledge;