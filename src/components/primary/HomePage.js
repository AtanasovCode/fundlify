import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Nav from '../secondary/Nav';
import '../../styles/homepage.css';
import illustration from '../../images/icons/illustration.svg';
import group from '../../images/icons/group.png';
import arrow from '../../images/icons/arrow.png';

const HomePage = ({
    userLoggedIn,
    auth,
}) => {

    const [navClass, setNavClass] = useState("nav-container");

    return (
        <div className="home-page-container">
            <div className="home-nav-container">
                <Nav 
                    userLoggedIn={userLoggedIn} 
                    auth={auth}
                />
                <div className="home-nav-img-container">
                    {/*Image Goes Here*/}
                </div>
                <div className="add-project-btn-container">
                    <div className="add-project-text">
                        Add Fundlify Project
                    </div>
                    <img
                        src={group}
                        className="group-icon"
                        alt="group icon"
                    />
                </div>
            </div>
            <div className="funds-raised-full-container">
                <div className="fundlify-funds-desc">
                    <div className="title">
                        Bring A
                        <span className="creative">
                            Creative</span>
                        Project To Life!
                    </div>
                    <div className="subtitle">On Fundlify:</div>
                </div>
                <div className="funds-raised-container">
                    <div className="line"></div>
                    <div className="fund-stats-container">
                        <div className="fund-number">24000000</div>
                        <div className="fund-text">Projects Funded</div>
                    </div>
                    <div className="money-raised-container">
                        <div className="money-raised"><h1>123742</h1></div>
                        <div className="fund-desc">Funds Raised</div>
                    </div>
                    <div className="fund-stats-container">
                        <div className="fund-number">5000000</div>
                        <div className="fund-text">Pledges Made</div>
                    </div>
                    <div className="line"></div>
                </div>
            </div>
            <div className="fund-steps-container">
                <div className="fund-steps-desc">
                    <div className="fund-steps-sub-text">What to expect?</div>
                    <div className="fund-steps-heading">
                        Fundraising on Fundlify
                        takes just a few minutes
                    </div>
                </div>
                <div className="steps-full-container">
                    <div className="step-container">
                        <div className="step-icon">
                            1
                        </div>
                        <div className="step-desc">
                            <div className="step-desc-title">
                                Start with the basics
                            </div>
                            <div className="step-desc-sub-title">
                                Kick things off with your product name and description
                            </div>
                        </div>
                    </div>
                    <div className="step-container">
                        <div className="step-icon">
                            2
                        </div>
                        <div className="step-desc">
                            <div className="step-desc-title">
                                Describe your product
                            </div>
                            <div className="step-desc-sub-title">
                                We'll guide with tips along the way
                            </div>
                        </div>
                    </div>
                    <div className="step-container">
                        <div className="step-icon">
                            3
                        </div>
                        <div className="step-desc">
                            <div className="step-desc-title">
                                Share with the world
                            </div>
                            <div className="step-desc-sub-title">
                                People out there want to help you
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="explore-full-container">
                <div className="explore-info-container">
                    <div className="explore-subtitle">
                        Make an impact
                    </div>
                    <div className="explore-title">
                        Fundraise for...
                    </div>
                </div>
                <div className="explore-category-container">
                    <div className="category-image-container games-image">
                        <div className="category-image-tint"></div>
                    </div>
                    <div className="category-info">
                        <div className="category-name">
                            Games
                        </div>
                        <div className="category-icon-container">
                            <img
                                src={arrow}
                                alt="arrow point"
                                className="arrow-point"
                            />
                        </div>
                    </div>
                </div>
                <div className="explore-category-container">
                    <div className="category-image-container comics-image">
                        <div className="category-image-tint"></div>
                    </div>
                    <div className="category-info">
                        <div className="category-name">
                            Comics
                        </div>
                        <div className="category-icon-container">
                            <img
                                src={arrow}
                                alt="arrow point"
                                className="arrow-point"
                            />
                        </div>
                    </div>
                </div>
                <div className="explore-category-container">
                    <div className="category-image-container tech-image">
                        <div className="category-image-tint"></div>
                    </div>
                    <div className="category-info">
                        <div className="category-name">
                            Technology
                        </div>
                        <div className="category-icon-container">
                            <img
                                src={arrow}
                                alt="arrow point"
                                className="arrow-point"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="get-started-full-container">
                <div className="get-started-container">
                    <div className="get-started-text-container">
                        <div className="get-started-heading">
                            Ready to get started?
                            Join thousands of others today!
                        </div>
                        <div className="get-started-btn">
                            <input
                                type="button"
                                value="Created Fundlify Account"
                                className="create-acc-btn started-btn"
                            />
                            <input
                                type="button"
                                value="How it works"
                                className="how-it-works-btn started-btn"
                            />
                        </div>
                    </div>
                    <div className="get-started-icon-container">
                        <img
                            src={illustration}
                            alt="illustration"
                            className="illustration-icon"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;