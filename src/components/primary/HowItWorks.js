import Nav from '../secondary/Nav';
import image from '../../images/image/how-it-works.webp';
import '../../styles/how-it-works.css';

const HowItWorks = ({
    userLoggedIn,
}) => {
    return (
        <div className="how-it-works-container">
            <Nav 
                sticky={true} 
                grow={true} 
                userLoggedIn={userLoggedIn}
            />
            <div className="hiw-heading">
                <div className="hiw-title">
                    How Fundlify Works
                </div>
                <div className="hiw-subtitle">
                    Fundlify is the best place to fundraise, wheter
                    you are an individual, group, or organization.
                </div>
            </div>
            <div className="hiw-image-container">
                <img
                    src={image}
                    alt="heading image"
                    className="image-heading"
                />
            </div>
            <div className="hiw-info">
                <div className="hiw-column">
                    <div className="hiw-list-title">
                        1. Start your fundraiser
                    </div>
                    <ul className="hiw-list">
                        <li>Set your fundraiser goal</li>
                        <li>Describe your project</li>
                        <li>Add a picture</li>
                    </ul>
                </div>
                <div className="hiw-column">
                    <div className="hiw-list-title">
                        2. Share your project
                    </div>
                    <ul className="hiw-list">
                        <li>Send emails</li>
                        <li>Share on social media</li>
                        <li>Advertise</li>
                    </ul>
                </div>
                <div className="hiw-column">
                    <div className="hiw-list-title">
                        3. Manage donations
                    </div>
                    <ul className="hiw-list">
                        <li>Receive Pledges</li>
                        <li>Reward Backers</li>
                        <li>Reach Goals</li>
                    </ul>
                </div>
            </div>
            <div className="hiw-button-container">
                <input
                    className="hiw-btn"
                    value="Get Started With Fundlify"
                />
            </div>
        </div>
    );
}

export default HowItWorks;