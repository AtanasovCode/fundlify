import * as Styled from '../../../styles/GetStarted.Styled';

const GetStarted = ({
    Link,
    illustration,
}) => {
    return (
        <Styled.Container>
            <Styled.Info>
                <Styled.Title>
                    Ready to get started?
                    Join thousands of others today!
                </Styled.Title>
                <Styled.Buttons>
                    <Styled.Button
                        to="/sign-up"
                    >
                        Get Started
                    </Styled.Button>
                    <Styled.HIWBtn
                        to="/how-it-works"
                    >
                        How it works
                    </Styled.HIWBtn>
                </Styled.Buttons>
            </Styled.Info>
            <Styled.ImageContainer>
                <Styled.Image
                    src={illustration}
                    alt="illustration"
                />
            </Styled.ImageContainer>
        </Styled.Container>
    );
}

export default GetStarted;