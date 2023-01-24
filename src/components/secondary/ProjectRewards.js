import { updateDoc, doc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState, useEffect } from "react";
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from 'firebase/storage';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { v4 } from "uuid";
import '../../styles/project-rewards.css';

const ProjectRewards = ({
    db,
    auth,
    user,
    storage,

    tierOneName,
    setTierOneName,
    tierTwoName,
    setTierTwoName,
    tierThreeName,
    setTierThreeName,

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

    currentProjectId,
    preventLetters,
}) => {

    const [isTierOne, setIsTierOne] = useState("");
    const [isTierTwo, setIsTierTwo] = useState("");
    const [isTierThree, setIsTierThree] = useState("");

    const [isRewardOne, setIsRewardOne] = useState(false);
    const [isRewardTwo, setIsRewardTwo] = useState(false);
    const [isRewardThree, setIsRewardThree] = useState(false);

    const [isPledgeOne, setIsPledgeOne] = useState(false);
    const [isPledgeTwo, setIsPledgeTwo] = useState(false);
    const [isPledgeThree, setIsPledgeThree] = useState(false);

    const { pathname } = useLocation();

    const colRef = collection(db, "projects");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const docRef = doc(db, "projects", sessionStorage.getItem("userId"));
    const navigate = useNavigate();



    const isFilled = () => {
        if (
            isTierOne &&
            isTierTwo &&
            isTierThree &&
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
        console.log("process started")
        sessionStorage.setItem("tier1", tierOneName);
        sessionStorage.setItem("tier2", tierTwoName);
        sessionStorage.setItem("tier3", tierThreeName);
        sessionStorage.setItem("reward1", reward1);
        sessionStorage.setItem("reward2", reward2);
        sessionStorage.setItem("reward3", reward3);
        sessionStorage.setItem("pledge1", pledge1);
        sessionStorage.setItem("pledge2", pledge2);
        sessionStorage.setItem("pledge3", pledge3);


        setDoc(docRef, {
            moneyBacked: 0,
            backers: 0,
            createdAt: serverTimestamp(),
            backersTierOne: 0,
            backersTierTwo: 0,
            backersTierThree: 0,
            userId: sessionStorage.getItem("userId"),
            createdBy: sessionStorage.getItem("createdBy"),
            category: sessionStorage.getItem("category"),
            subCategory: sessionStorage.getItem("subCategory"),
            location: sessionStorage.getItem("location"),
            projectTitle: sessionStorage.getItem("projectTitle"),
            projectDescription: sessionStorage.getItem("projectDescription"),
            fundingGoal: sessionStorage.getItem("fundingGoal"),
            projectImageUrl: sessionStorage.getItem("imageURL"),
            documentId: sessionStorage.getItem("userId"),
            tierOne: sessionStorage.getItem("tier1"),
            tierTwo: sessionStorage.getItem("tier2"),
            tierThree: sessionStorage.getItem("tier3"),
            reward1: sessionStorage.getItem("reward1"),
            reward2: sessionStorage.getItem("reward2"),
            reward3: sessionStorage.getItem("reward3"),
            pledge1: sessionStorage.getItem("pledge1"),
            pledge2: sessionStorage.getItem("pledge2"),
            pledge3: sessionStorage.getItem("pledge3"),
        })
            .then(() => {
                setReward1("");
                setReward2("");
                setReward3("");
                setPledge1("");
                setPledge2("");
                setPledge3("");
                setTierOneName("");
                setTierTwoName();
                setTierThreeName("");
                navigate("../create-project/congratulations", { replace: true });
            })
            .catch((err) => {
                console.log(err.message);
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
                    <div className="tier-name-container">
                        <div className="tier-name-info">
                            <div className="tier-name">
                                Tier Name
                            </div>
                            <div className="tier-name-description">
                                Give your tier a name
                            </div>
                        </div>
                        <div className="tier-name-input-container">
                            <div className="tier-name">
                                Name
                            </div>
                            <input
                                type="text"
                                className="tier-name-input"
                                placeholder="Helpful Donor"
                                value={tierOneName}
                                onChange={(e) => {
                                    if (e.currentTarget.value !== "") {
                                        setIsTierOne(true);
                                    } else {
                                        setIsTierOne(false);
                                    }
                                    setTierOneName(e.currentTarget.value);
                                }}
                            />
                        </div>
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
                                maxLength={6}
                                onKeyPress={(e) => preventLetters(e)}
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
                    <div className="tier-name-container">
                        <div className="tier-name-info">
                            <div className="tier-name">
                                Tier Name
                            </div>
                            <div className="tier-name-description">
                                Give your tier a name
                            </div>
                        </div>
                        <div className="tier-name-input-container">
                            <div className="tier-name">
                                Name
                            </div>
                            <input
                                type="text"
                                className="tier-name-input"
                                placeholder="Helpful Donor"
                                value={tierTwoName}
                                onChange={(e) => {
                                    if (e.currentTarget.value !== "") {
                                        setIsTierTwo(true);
                                    } else {
                                        setIsTierTwo(false);
                                    }
                                    setTierTwoName(e.currentTarget.value);
                                }}
                            />
                        </div>
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
                                    maxLength={6}
                                    onKeyPress={(e) => preventLetters(e)}
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
                    <div className="tier-name-container">
                        <div className="tier-name-info">
                            <div className="tier-name">
                                Tier Name
                            </div>
                            <div className="tier-name-description">
                                Give your tier a name
                            </div>
                        </div>
                        <div className="tier-name-input-container">
                            <div className="tier-name">
                                Name
                            </div>
                            <input
                                type="text"
                                className="tier-name-input"
                                placeholder="Helpful Donor"
                                value={tierThreeName}
                                onChange={(e) => {
                                    if (e.currentTarget.value !== "") {
                                        setIsTierThree(true);
                                    } else {
                                        setIsTierThree(false);
                                    }
                                    setTierThreeName(e.currentTarget.value);
                                }}
                            />
                        </div>
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
                                    maxLength={6}
                                    value={pledge3}
                                    onKeyPress={(e) => preventLetters(e)}
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
                <div
                    onClick={handleCreateProject}
                    className={
                        isFilled() ?
                            "create-project-btn active"
                            :
                            "create-project-btn"
                    }
                >
                    Create Project
                </div>
            </div>
        </div >
    );
}

export default ProjectRewards;