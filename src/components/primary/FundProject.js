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
import * as Styled from '../../styles/FundProject.Styled';
import Nav from "../secondary/Nav";
import FAQ from "./fund-project-sections/FAQ";
import PledgeComponent from "./fund-project-sections/PledgeComponent";
import NoRewardPledge from "./fund-project-sections/NoRewardPledge";
import '../../styles/fund-project.css';

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
                updateDoc(doc(db, "users", sessionStorage.getItem("userId")), {
                    projectsDonatedTo: arrayUnion(sessionStorage.getItem("currentProjectId")),
                    projectsBacked: increment(1),
                })
                    .then(() => {
                        setPledgeAmount("");
                        navigate("../donation-finished", { replace: true });
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })

            })
            .catch((err) => {
                console.log(err.message);
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
        <Styled.FullContainer>
            <Nav grow={true} sticky={true} userLoggedIn={userLoggedIn} />
            {
                project ?
                    project.map((project) => {
                        return (
                            <Styled.Container key={project.documentId}>
                                <Styled.Heading>
                                    <Styled.Title>
                                        {project.projectTitle}
                                    </Styled.Title>
                                    <Styled.SubTitle>
                                        {project.projectDescription}
                                    </Styled.SubTitle>
                                </Styled.Heading>
                                <Styled.Funding>
                                    <div className="rewards-pledge-container">
                                        <div className="rewards-pledge-heading">
                                            <div className="rewards-pledge-title">
                                                Select your reward
                                            </div>
                                            <div className="rewards-pledge-subtitle">
                                                Select an option below
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
                                </Styled.Funding>
                                <FAQ 
                                    faqClassName={faqClassName}
                                />
                            </Styled.Container>
                        );
                    })
                    :
                    <div>
                        <h2>Loading</h2>
                    </div>
            }
        </Styled.FullContainer>
    );
}

export default FundProject;
