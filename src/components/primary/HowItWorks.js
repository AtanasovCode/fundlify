import Nav from '../secondary/Nav';
import * as Styled from '../../styles/HowItWorks.Styled';
import image from '../../images/image/how-it-works.webp';
import '../../styles/how-it-works.css';

const HowItWorks = ({
    userLoggedIn,
}) => {
    return (
        <Styled.Container>
            <Nav
                sticky={true}
                grow={true}
                userLoggedIn={userLoggedIn}
            />
            <Styled.Heading>
                <Styled.Title>
                    How Fundlify Works
                </Styled.Title>
                <Styled.Subtitle>
                    Fundlify is the best place to fundraise, wheter
                    you are an individual, group, or organization.
                </Styled.Subtitle>
            </Styled.Heading>
            <Styled.ImageContainer>
                <Styled.Image
                    src={image}
                    alt="heading image"
                />
            </Styled.ImageContainer>
            <Styled.Info>
                <Styled.Column>
                    <Styled.ListTitle>
                        1. Start your fundraiser
                    </Styled.ListTitle>
                    <Styled.List>
                        <li>Set your fundraiser goal</li>
                        <li>Describe your project</li>
                        <li>Add a picture</li>
                    </Styled.List>
                </Styled.Column>
                <Styled.Column>
                    <Styled.ListTitle>
                        2. Share your project
                    </Styled.ListTitle>
                    <Styled.List>
                        <li>Send emails</li>
                        <li>Share on social media</li>
                        <li>Advertise</li>
                    </Styled.List>
                </Styled.Column>
                <Styled.Column>
                    <Styled.ListTitle>
                        3. Manage donations
                    </Styled.ListTitle>
                    <Styled.List>
                        <li>Receive Pledges</li>
                        <li>Reward Backers</li>
                        <li>Reach Goals</li>
                    </Styled.List>
                </Styled.Column>
            </Styled.Info>
            <Styled.ButtonContainer>
                <Styled.Button
                    type="button"
                    value="Get Started With Fundlify"
                />
            </Styled.ButtonContainer>
        </Styled.Container>
    );
}

export default HowItWorks;