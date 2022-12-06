import { updateDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import '../../styles/project-rewards.css';

const ProjectRewards = ({
    db,
    auth,
    user,
    reward1,
    setReward1,
    reward2,
    setReward2,
    reward3,
    setReward3,
    pledge1,
    setPledge1,
    pledge2,
    setPledge2,
    pledge3,
    setPledge3,
}) => {

    const [isRewardOne, setIsRewardOne] = useState(false);
    const [isRewardTwo, setIsRewardTwo] = useState(false);
    const [isRewardThree, setIsRewardThree] = useState(false);

    const [isPledgeOne, setIsPledgeOne] = useState(false);
    const [isPledgeTwo, setIsPledgeTwo] = useState(false);
    const [isPledgeThree, setIsPledgeThree] = useState(false);

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const docRef = doc(db, "projects", sessionStorage.getItem("docId"));
    const navigate = useNavigate();



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

    const handleCreateProject = () => {
        updateDoc(docRef, {
            reward1: reward1,
            reward2: reward2,
            reward3: reward3,
            pledge1: pledge1,
            pledge2: pledge2,
            pledge3: pledge3,
        })
            .then(() => {
                navigate("../congratulations");
            })
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
                                value={reward1}
                                onChange={(e) => {
                                    if (e.currentTarget.value !== "") {
                                        setIsRewardOne(true);
                                    } else {
                                        setIsRewardOne(false);
                                    }
                                    setReward1(e.currentTarget.value)
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
                                value={pledge1}
                                onChange={(e) => {
                                    if (e.currentTarget.value !== "") {
                                        setIsPledgeOne(true);
                                    } else {
                                        setIsPledgeOne(false);
                                    }
                                    setPledge1(e.currentTarget.value);
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
                                value={reward2}
                                onChange={(e) => {
                                    if (e.currentTarget.value !== "") {
                                        setIsRewardTwo(true);
                                    } else {
                                        setIsRewardTwo(false);
                                    }
                                    setReward2(e.currentTarget.value)
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
                                    value={pledge2}
                                    onChange={(e) => {
                                        if (e.currentTarget.value !== "") {
                                            setIsPledgeTwo(true);
                                        } else {
                                            setIsPledgeTwo(false);
                                        }
                                        setPledge2(e.currentTarget.value);
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
                                    value={reward3}
                                    placeholder="Signed limited edition..."
                                    onChange={(e) => {
                                        if (e.currentTarget.value !== "") {
                                            setIsRewardThree(true)
                                        } else {
                                            setIsRewardThree(false)
                                        }
                                        setReward3(e.currentTarget.value)
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
                                    value={pledge3}
                                    onChange={(e) => {
                                        if (e.currentTarget.value !== "") {
                                            setIsPledgeThree(true);
                                        } else {
                                            setIsPledgeThree(false);
                                        }
                                        setPledge3(e.currentTarget.value);
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
                <input
                    to="/create-project/congratulations"
                    value="Create Project"
                    onClick={handleCreateProject}
                    className={
                        isFilled() ?
                            "create-project-btn active"
                            :
                            "create-project-btn"
                    }
                />
            </div>
        </div >
    );
}

export default ProjectRewards;