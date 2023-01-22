import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    collection,
    query,
    where,
    onSnapshot,
    updateDoc,
    doc,
    arrayUnion,
    setDoc,
    increment,
} from 'firebase/firestore';
import Nav from "./Nav";
import '../../styles/fund-project.css';
import noRewardIcon from '../../images/icons/no-reward-icon.png';
import Arrow from '../../images/icons/faq-arrow.png';

const FundProject = ({
    db,
    auth,
    user,
    userLoggedIn,
}) => {

    const [project, setProject] = useState("");
    const [faqClassName, setFaqClassName] = useState("faq-a")
    const [fundNoReward, setFundNoReward] = useState("");
    const [pledgeAmount, setPledgeAmount] = useState("");
    const [totalPledge, setTotalPledge] = useState();
    const [backersTier, setBackersTier] = useState("");
    const [errorClass, setErrorClass] = useState("error");
    const [inputClass, setInputClass] = useState("pledge-no-reward-input");

    const navigate = useNavigate();

    const colRef = collection(db, "projects");
    const docRef = doc(db, "projects", `${sessionStorage.getItem("currentProjectId")}`);
    const q = query(colRef, where("documentId", "==", `${sessionStorage.getItem("currentProjectId")}`));

    useEffect(() => {
        onSnapshot(q, (snapshot) => {
            let project = [];
            snapshot.docs.forEach((doc) => {
                project.push({ ...doc.data(), id: doc.id });
            })
            setProject(project)
        })
    }, [])

    const handleFundProject = (value, backersTier) => {
        let totalPledge = value;
        if (pledgeAmount !== "") {
            totalPledge = parseInt(pledgeAmount) + parseInt(value);
        }
        updateDoc(docRef, {
            backers: increment(1),
            moneyBacked: increment(totalPledge),
            [backersTier]: increment(1),
        })
            .then(() => {
                setPledgeAmount("");
                navigate("../donation-finished", { replace: true });
            })
    }

    const handleFundNoReward = () => {
        if (fundNoReward) {
            updateDoc(docRef, {
                backers: increment(1),
                moneyBacked: increment(parseInt(fundNoReward)),
            })
                .then(() => {
                    updateDoc(doc(db, "users", `${sessionStorage.getItem("userId")}`), {
                        projectsDonatedTo: arrayUnion(sessionStorage.getItem("currentProjectId")),
                        projectsBacked: increment(1),
                    })
                        .then(() => {
                            setFundNoReward("");
                            console.log("user updated");
                            navigate("../donation-finished", { replace: true });
                        })
                        .catch((err) => {
                            console.log(err.message);
                        })

                })
                .catch((err) => {
                    console.log(err.message);
                })
        } else {
            setInputClass("pledge-no-reward-input error-input")
            setErrorClass("error show")
        }

    }

    const preventLetters = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    }

    const formatNumber = (number) => {
        return parseInt(number).toLocaleString('en-US');
    }


    return (
        <div className="fund-project-full-container">
            <Nav grow={true} sticky={true} userLoggedIn={userLoggedIn} />
            {
                project ?
                    project.map((project) => {
                        return (
                            <div className="fund-project-container" key={project.documentId}>
                                <div className="fund-project-heading">
                                    <div className="fund-project-title">
                                        {project.projectTitle}
                                    </div>
                                    <div className="fund-project-subtitle">
                                        {project.projectDescription}
                                    </div>
                                </div>
                                <div className="fund-rewards-container">
                                    <div className="rewards-pledge-container">
                                        <div className="rewards-pledge-heading">
                                            <div className="rewards-pledge-title">
                                                Select your reward
                                            </div>
                                            <div className="rewards-pledge-subtitle">
                                                Select an option below
                                            </div>
                                        </div>
                                        <div className="pledge-no-reward-container">
                                            <div className="pledge-no-reward-title">
                                                Pledge without a reward
                                            </div>
                                            <div className="pledge-input-full-container">
                                                <label htmlFor="pledge-no-reward" className="pledge-no-reward">
                                                    Pledge Amount
                                                </label>
                                                <div className="pledge-input-no-reward-container">
                                                    <input
                                                        type="text"
                                                        placeholder="10"
                                                        className={inputClass}
                                                        value={fundNoReward}
                                                        maxLength={4}
                                                        onKeyPress={(e) => preventLetters(e)}
                                                        onChange={(e) => {
                                                            setErrorClass("error");
                                                            setInputClass("pledge-no-reward-input")
                                                            setFundNoReward(e.currentTarget.value);
                                                        }}
                                                        onKeyPress={(e) => preventLetters(e)}
                                                    />
                                                    <div className={errorClass}>
                                                        Please enter pledge amount
                                                    </div>
                                                    <input
                                                        type="button"
                                                        value="Pledge"
                                                        className="btn-pledge-no-reward"
                                                        onClick={() => handleFundNoReward()}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pledge-container">
                                            <div className="pledge-amount">
                                                Pledge ${project.pledge1}
                                            </div>
                                            <div className="tier-pledge-name">
                                                {project.tierOne}
                                            </div>
                                            <div className="tier-description">
                                                {project.reward1}
                                            </div>
                                            <div className="tier-backers-amount">
                                                {project.backersTierOne} backers
                                            </div>
                                            <div className="pledge-input-container">
                                                <div className="pledge-input-label">
                                                    Bonus support <span className="optional">(Optional)</span>
                                                </div>
                                                <div className="pledge-input">
                                                    <input
                                                        type="input"
                                                        className="pledge-input-amount"
                                                        placeholder="10"
                                                        maxLength={4}
                                                        onKeyPress={(e) => preventLetters(e)}
                                                        onChange={(e) => {
                                                            setPledgeAmount(e.currentTarget.value);
                                                        }}
                                                    />
                                                    <input
                                                        type="button"
                                                        className="pledge-btn"
                                                        value={
                                                            pledgeAmount !== "" ?
                                                                `Pledge $${formatNumber(parseInt(project.pledge1) + parseInt(pledgeAmount))}`
                                                                :
                                                                `Pledge $${formatNumber(parseInt(project.pledge1))}`
                                                        }
                                                        onClick={() => {
                                                            let backersTier = "backersTierOne";
                                                            handleFundProject(project.pledge1, backersTier)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pledge-container">
                                            <div className="pledge-amount">
                                                Pledge ${project.pledge2}
                                            </div>
                                            <div className="tier-pledge-name">
                                                {project.tierTwo}
                                            </div>
                                            <div className="tier-description">
                                                {project.reward2}
                                            </div>
                                            <div className="tier-backers-amount">
                                                {project.backersTierTwo} backers
                                            </div>
                                            <div className="pledge-input-container">
                                                <div className="pledge-input-label">
                                                    Bonus support <span className="optional">(Optional)</span>
                                                </div>
                                                <div className="pledge-input">
                                                    <input
                                                        type="input"
                                                        className="pledge-input-amount"
                                                        placeholder="10"
                                                        maxLength={4}
                                                        onKeyPress={(e) => preventLetters(e)}
                                                        onChange={(e) => {
                                                            setPledgeAmount(e.currentTarget.value);
                                                        }}
                                                    />
                                                    <input
                                                        type="button"
                                                        className="pledge-btn"
                                                        value={
                                                            pledgeAmount !== "" ?
                                                                `Pledge $${formatNumber(parseInt(project.pledge2) + parseInt(pledgeAmount))}`
                                                                :
                                                                `Pledge $${parseInt(formatNumber(project.pledge2))}`
                                                        }
                                                        onClick={() => {
                                                            let backersTier = "backersTierTwo";
                                                            handleFundProject(project.pledge2, backersTier)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pledge-container">
                                            <div className="pledge-amount">
                                                Pledge ${project.pledge3}
                                            </div>
                                            <div className="tier-pledge-name">
                                                {project.tierThree}
                                            </div>
                                            <div className="tier-description">
                                                {project.reward3}
                                            </div>
                                            <div className="tier-backers-amount">
                                                {project.backersTierThree} backers
                                            </div>
                                            <div className="pledge-input-container">
                                                <div className="pledge-input-label">
                                                    Bonus support <span className="optional">(Optional)</span>
                                                </div>
                                                <div className="pledge-input">
                                                    <input
                                                        type="input"
                                                        className="pledge-input-amount"
                                                        placeholder="10"
                                                        maxLength={4}
                                                        onKeyPress={(e) => preventLetters(e)}
                                                        onChange={(e) => {
                                                            setPledgeAmount(e.currentTarget.value);
                                                        }}
                                                    />
                                                    <input
                                                        type="button"
                                                        className="pledge-btn"
                                                        value={
                                                            pledgeAmount !== "" ?
                                                                `Pledge $${formatNumber(parseInt(project.pledge3) + parseInt(pledgeAmount))}`
                                                                :
                                                                `Pledge $${parseInt(project.pledge3)}`
                                                        }
                                                        onClick={() => {
                                                            let backersTier = "backersTierThree";
                                                            handleFundProject(project.pledge3, backersTier);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="rewards-info-full-container">
                                        <div className="rewards-info-heading">
                                            <div className="rewards-info-img-container">
                                                <img
                                                    src={noRewardIcon}
                                                    alt="cart icon"
                                                    className="rewards-info-img"
                                                />
                                            </div>
                                            <div className="rewards-info-title">
                                                Rewards aren't guaranteed.
                                            </div>
                                        </div>
                                        <div className="rewards-info-container">
                                            <div className="rewards-info">
                                                Your pledge will support an ambitious creative
                                                project that has yet to be developed. There’s
                                                a risk that, despite a creator’s best efforts,
                                                your reward will not be fulfilled, and we urge
                                                you to consider this risk prior to pledging.
                                                Fundlify is not responsible for project claims
                                                or reward fulfillment.
                                            </div>
                                        </div>
                                        <div className="faq-container">
                                            <div className="faq-title">
                                                Frequantly Asked Questions
                                            </div>
                                            <div className="faq" onClick={(e) => {
                                                if (e.currentTarget.childNodes[1].className === "faq-a") {
                                                    e.currentTarget.childNodes[1].className = "faq-a show"
                                                    e.currentTarget.children[0].children[0].className = "faq-arrow show"
                                                } else {
                                                    e.currentTarget.childNodes[1].className = "faq-a"
                                                    e.currentTarget.childNodes[0].children[0].className = "faq-arrow"
                                                }
                                            }}>
                                                <div className="faq-q">
                                                    <img
                                                        src={Arrow}
                                                        className="faq-arrow"
                                                    />
                                                    How do I pledge?
                                                </div>
                                                <div className={faqClassName}>
                                                    Enter your pledge amount and
                                                    select a reward. Do not enter
                                                    any type of payment information.
                                                    This is not a real funding website.
                                                </div>
                                            </div>
                                            <div
                                                className="faq"
                                                onClick={(e) => {
                                                    if (e.currentTarget.childNodes[1].className === "faq-a") {
                                                        e.currentTarget.childNodes[1].className = "faq-a show"
                                                        e.currentTarget.children[0].children[0].className = "faq-arrow show"
                                                    } else {
                                                        e.currentTarget.childNodes[1].className = "faq-a"
                                                        e.currentTarget.childNodes[0].children[0].className = "faq-arrow"
                                                    }
                                                }}
                                            >
                                                <div className="faq-q">
                                                    <img
                                                        src={Arrow}
                                                        className="faq-arrow"
                                                    />
                                                    Whan is my card charged?
                                                </div>
                                                <div className={faqClassName}>
                                                    This is not a real funding website,
                                                    you do not have to upload card details
                                                    and your card will never be charged.
                                                </div>
                                            </div>
                                            <div
                                                className="faq"
                                                onClick={(e) => {
                                                    if (e.currentTarget.childNodes[1].className === "faq-a") {
                                                        e.currentTarget.childNodes[1].className = "faq-a show"
                                                        e.currentTarget.children[0].children[0].className = "faq-arrow show"
                                                    } else {
                                                        e.currentTarget.childNodes[1].className = "faq-a"
                                                        e.currentTarget.childNodes[0].children[0].className = "faq-arrow"
                                                    }
                                                }}
                                            >
                                                <div className="faq-q">
                                                    <img
                                                        src={Arrow}
                                                        className="faq-arrow"
                                                    />
                                                    So I am only charged when funding is complete?
                                                </div>
                                                <div className={faqClassName}>
                                                    You will never get charged, this is not
                                                    a real funding website.
                                                </div>
                                            </div>
                                            <div
                                                className="faq"
                                                onClick={(e) => {
                                                    if (e.currentTarget.childNodes[1].className === "faq-a") {
                                                        e.currentTarget.childNodes[1].className = "faq-a show"
                                                        e.currentTarget.children[0].children[0].className = "faq-arrow show"
                                                    } else {
                                                        e.currentTarget.childNodes[1].className = "faq-a"
                                                        e.currentTarget.childNodes[0].children[0].className = "faq-arrow"
                                                    }
                                                }}
                                            >
                                                <div className="faq-q">
                                                    <img
                                                        src={Arrow}
                                                        className="faq-arrow"
                                                    />
                                                    What can others see about my pledge?
                                                </div>
                                                <div className={faqClassName}>
                                                    Every project you pledge to
                                                    will be visible on your profile page.
                                                    However, other users cannot access
                                                    your profile page.
                                                </div>
                                            </div>
                                            <div
                                                className="faq"
                                                onClick={(e) => {
                                                    if (e.currentTarget.childNodes[1].className === "faq-a") {
                                                        e.currentTarget.childNodes[1].className = "faq-a show"
                                                        e.currentTarget.children[0].children[0].className = "faq-arrow show"
                                                    } else {
                                                        e.currentTarget.childNodes[1].className = "faq-a"
                                                        e.currentTarget.childNodes[0].children[0].className = "faq-arrow"
                                                    }
                                                }}
                                            >
                                                <div className="faq-q">
                                                    <img
                                                        src={Arrow}
                                                        className="faq-arrow"
                                                    />
                                                    What if I want to change my pledge?
                                                </div>
                                                <div className={faqClassName}>
                                                    You cannot change your pledge once you make it.
                                                    You are only allowed one pledge per account.
                                                </div>
                                            </div>
                                            <div
                                                className="faq"
                                                onClick={(e) => {
                                                    if (e.currentTarget.childNodes[1].className === "faq-a") {
                                                        e.currentTarget.childNodes[1].className = "faq-a show"
                                                        e.currentTarget.children[0].children[0].className = "faq-arrow show"
                                                    } else {
                                                        e.currentTarget.childNodes[1].className = "faq-a"
                                                        e.currentTarget.childNodes[0].children[0].className = "faq-arrow"
                                                    }
                                                }}
                                            >
                                                <div className="faq-q">
                                                    <img
                                                        src={Arrow}
                                                        className="faq-arrow"
                                                    />
                                                    If this project is funded, how do I get my reward?
                                                </div>
                                                <div className={faqClassName}>
                                                    Rewards are all made up and not real.
                                                    You will not be getting any rewards.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    :
                    <div>
                        <h2>Loading</h2>
                    </div>
            }
        </div>
    );
}

export default FundProject;
