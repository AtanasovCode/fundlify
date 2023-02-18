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
            <Nav grow={true} sticky={false} userLoggedIn={userLoggedIn} />
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
                                <Styled.FundingFAQ>
                                    <Styled.Funding>
                                        <Styled.PledgeHeading>
                                            <Styled.PledgeTitle>
                                                Select your reward
                                            </Styled.PledgeTitle>
                                            <Styled.PledgeSubtitle>
                                                Select an option below
                                            </Styled.PledgeSubtitle>
                                        </Styled.PledgeHeading>
                                        <NoRewardPledge
                                            fundNoReward={fundNoReward}
                                            preventLetters={preventLetters}
                                            setFundNoReward={setFundNoReward}
                                            handleFundNoReward={handleFundNoReward}
                                        />
                                        <PledgeComponent
                                            project={project}
                                            preventLetters={preventLetters}
                                            pledgeAmount={pledgeAmount}
                                            setPledgeAmount={setPledgeAmount}
                                            formatNumber={formatNumber}
                                            handleFundProject={handleFundNoReward}
                                            pledge={project.pledge1}
                                            tier={project.tierOne}
                                            reward={project.reward1}
                                            backers={project.backersTierOne}
                                        />
                                        <PledgeComponent
                                            project={project}
                                            preventLetters={preventLetters}
                                            pledgeAmount={pledgeAmount}
                                            setPledgeAmount={setPledgeAmount}
                                            formatNumber={formatNumber}
                                            handleFundProject={handleFundNoReward}
                                            pledge={project.pledge2}
                                            tier={project.tierTwo}
                                            reward={project.reward2}
                                            backers={project.backersTierTwo}
                                        />
                                        <PledgeComponent
                                            project={project}
                                            preventLetters={preventLetters}
                                            pledgeAmount={pledgeAmount}
                                            setPledgeAmount={setPledgeAmount}
                                            formatNumber={formatNumber}
                                            handleFundProject={handleFundNoReward}
                                            pledge={project.pledge3}
                                            tier={project.tierThree}
                                            reward={project.reward3}
                                            backers={project.backersTierThree}
                                        />
                                    </Styled.Funding>
                                    <FAQ
                                        faqClassName={faqClassName}
                                    />
                                </Styled.FundingFAQ>
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
