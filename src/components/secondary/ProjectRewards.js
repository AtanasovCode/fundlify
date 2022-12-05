import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../styles/project-rewards.css';

const ProjectRewards = () => {

    const [isRewardOne, setIsRewardOne] = useState(false);
    const [isRewardTwo, setIsRewardTwo] = useState(false);
    const [isRewardThree, setIsRewardThree] = useState(false);

    const [isPledgeOne, setIsPledgeOne] = useState(false);
    const [isPledgeTwo, setIsPledgeTwo] = useState(false);
    const [isPledgeThree, setIsPledgeThree] = useState(false);


    const isFilled = () => {
        if (
            isRewardOne &&
            isRewardTwo &&
            isRewardThree &&
            isPledgeOne &&
            isPledgeTwo &&
            isPledgeThree
        ) {
            return true;
        } else {
            return false;
        }
    }


    return (
        <div className="project-rewards-container">
            <div className="project-rewards-heading">
                <div className="project-rewards-title">
                    Almost Done! It's time to add your rewards
                </div>
                <div className="project-rewards-subtitle">
                    Offer simple, meaningful ways to bring backers closer to your
                    project and celebrate it coming to life.
                </div>
            </div>
            <div className="project-rewards-tiers-container">

                <div className="reward-tier-container">
                    <div className="tier-title">
                        Tier 1 Reward
                    </div>
                    <div className="tier-rewards-details-container">
                        <div className="tier-rewards-input-container">
                            <div className="tier-name">
                                Reward
                            </div>
                            <textarea
                                maxLength={200}
                                type="text"
                                className="tier-input-text"
                                placeholder="Signed limited edition..."
                                onChange={(e) => {
                                    if (e.currentTarget.value !== "") {
                                        setIsRewardOne(true);
                                    } else {
                                        setIsRewardOne(false);
                                    }
                                }}
                            />
                        </div>
                        <div className="tier-rewards-input-container">
                            <div className="tier-name">
                                Pledge amount
                            </div>
                            <input
                                type="text"
                                className="tier-input"
                                placeholder="$0"
                                onChange={(e) => {
                                    if (e.currentTarget.value !== "") {
                                        setIsPledgeOne(true);
                                    } else {
                                        setIsPledgeOne(false);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="reward-tier-container">
                    <div className="tier-title">
                        Tier 2 Reward
                    </div>
                    <div className="tier-rewards-details-container">
                        <div className="tier-rewards-input-container">
                            <div className="tier-name">
                                Reward
                            </div>
                            <textarea
                                maxLength={200}
                                type="text"
                                className="tier-input-text"
                                placeholder="Signed limited edition..."
                                onChange={(e) => {
                                    if (e.currentTarget.value !== "") {
                                        setIsRewardTwo(true);
                                    } else {
                                        setIsRewardTwo(false);
                                    }
                                }}
                            />
                        </div>
                        <div className="tier-rewards-input-container">
                            <div className="tier-name">
                                Pledge amount
                            </div>
                            <div>
                                <input
                                    type="text"
                                    className="tier-input"
                                    placeholder="$0"
                                    onChange={(e) => {
                                        if (e.currentTarget.value !== "") {
                                            setIsPledgeTwo(true);
                                        } else {
                                            setIsPledgeTwo(false);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="reward-tier-container">
                    <div className="tier-title">
                        Tier 3 Reward
                    </div>
                    <div className="tier-rewards-details-container">
                        <div className="tier-rewards-input-container">
                            <div className="tier-name">
                                Reward
                            </div>
                            <div>
                                <textarea
                                    maxLength={200}
                                    type="text"
                                    className="tier-input-text"
                                    placeholder="Signed limited edition..."
                                    onChange={(e) => {
                                        if (e.currentTarget.value !== "") {
                                            setIsRewardThree(true)
                                        } else {
                                            setIsRewardThree(false)
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="tier-rewards-input-container">
                            <div className="tier-name">
                                Pledge amount
                            </div>
                            <div>
                                <input
                                    type="text"
                                    className="tier-input"
                                    placeholder="$0"
                                    onChange={(e) => {
                                        if (e.currentTarget.value !== "") {
                                            setIsPledgeThree(true);
                                        } else {
                                            setIsPledgeThree(false);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="create-project-btn-container">
                {
                    isFilled() ?
                        <div className="create-project-btn-desc">
                            Your project is ready!
                        </div>
                        :
                        <div className="create-project-btn-desc">
                            Create rewards to continue
                        </div>
                }
                <Link
                    to="/create-project/congratulations"
                    className={
                        isFilled() ?
                            "create-project-btn active"
                            :
                            "create-project-btn"
                    }
                >
                    Create Project
                </Link>
            </div>
        </div >
    );
}

export default ProjectRewards;