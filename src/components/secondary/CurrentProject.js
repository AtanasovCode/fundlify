import { useState, useEffect } from "react";
import { Link, useNavigate, } from "react-router-dom";
import * as Styled from '../../styles/CurrentProject.Styled';
import {
    collection,
    onSnapshot,
    onSnapshotsInSync,
    query,
    where,
    docs,
    doc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";
import Nav from "./Nav";
import NoPermission from "./NoPermission";
import FundProject from "../primary/FundProject";
import categoryIcon from '../../images/icons/category.png';
import subCategoryIcon from '../../images/icons/sub-category.png';
import locationIcon from '../../images/icons/location.png';


const CurrentProject = ({
    db,
    user,
    userLoggedIn,
    userInfo,
    currentProjectId,
    formatTextForURL,
}) => {

    const [currentProject, setCurrentProject] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [grow, setGrow] = useState(true);
    const [sticky, setSticky] = useState(true);
    const [hasDonatedToProject, setHasDonatedToProject] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);

    const colRef = collection(db, "projects");
    const userRef = collection(db, "users");
    const navigate = useNavigate();


    const handleShowPopUp = () => {
        setShowPopUp(true);
    }

    const handleClosePopUp = () => {
        setShowPopUp(false);
    }

    useEffect(() => {
        const q = query(colRef, where("documentId", "==", `${sessionStorage.getItem("currentProjectId")}`));
        onSnapshot(q, (snapshot) => {
            let project = [];
            snapshot.docs.forEach((doc) => {
                project.push({ ...doc.data(), id: doc.id });
            })
            setCurrentProject(project)
        })
    }, [])

    useEffect(() => {
        const userQ = query(userRef, where("userId", "==", `${sessionStorage.getItem("userId")}`));
        onSnapshot(userQ, (snapshot) => {
            let user = [];
            snapshot.docs.forEach((doc) => {
                user.push({ ...doc.data(), id: doc.id });
            })
            setCurrentUser(user);
        })
    }, [])

    useEffect(() => {
        if (currentUser) {
            currentUser.map((user) => {
                user.projectsDonatedTo.map((projectId) => {
                    if (projectId === sessionStorage.getItem("currentProjectId")) {
                        setHasDonatedToProject(true);
                    }
                })
            })
        }
    }, [currentUser])



    //Formats the string 
    //For the category names
    const formatString = (string) => {
        string = string.replace(/-/g, ' ');
        return string.replace(/\b\w/g, l => l.toUpperCase())
    }

    //Formats the number to 'en-US'
    const formatNumber = (number) => {
        return parseInt(number).toLocaleString('en-US');
    }

    //Calculates the progress of the project
    const calculateProgress = (total, raised) => {
        let percent = 0;
        let progress = raised / total;
        if (progress > 0) {
            percent = progress * 100;
        } else {
            percent = 0;
        }
        return parseInt(Math.floor(percent));
    }

    //Goes to the donation page if 
    //The user has never donated to this project
    const handleDonateToProject = () => {
        if (hasDonatedToProject === false) {
            navigate(`../fund-project/${sessionStorage.getItem("currentProjectId")}`)
        } else {
            handleShowPopUp()
        }
    }

    //Deletes the project if the current user is the owner of the project
    //And updates the isProjectOwner field to false for the current user
    const handleDeleteProject = () => {
        deleteDoc(doc(db, "projects", sessionStorage.getItem("userId")))
            .then(() => {
                updateDoc(doc(db, "users", sessionStorage.getItem("userId")), {
                    isProjectOwner: false,
                })
                    .then(() => {
                        navigate(`../users/(${formatTextForURL(sessionStorage.getItem("username"))}`, { replace: true });
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })
            })
            .catch((err) => {
                console.log(err.message);
            })
    }


    return (
        <Styled.Container>
            <Nav
                grow={true}
                sticky={true}
                userLoggedIn={userLoggedIn}
                user={user}
            />
            {
                currentProject.map((project) => {
                    return (
                        <Styled.Project key={project.documentId}>
                            <NoPermission
                                permissionType="donation"
                                showPopUp={showPopUp}
                                setShowPopUp={setShowPopUp}
                                handleClosePopUp={handleClosePopUp}
                            />
                            <Styled.Heading>
                                <Styled.Title>
                                    {project.projectTitle}
                                </Styled.Title>
                            </Styled.Heading>
                            <Styled.Info>
                                <Styled.ImageContainer>
                                    <Styled.Image
                                        alt="project image"
                                        src={project.projectImageUrl}
                                    />
                                    <Styled.Categories>
                                        <Styled.Category>
                                            <Styled.CategoryIcon
                                                src={categoryIcon}
                                            />
                                            <Styled.CategoryName>
                                                {formatString(project.category)}
                                            </Styled.CategoryName>
                                        </Styled.Category>
                                        <Styled.Category>
                                            <Styled.CategoryIcon
                                                src={subCategoryIcon}
                                            />
                                            <Styled.CategoryName>
                                                {formatString(project.subCategory)}
                                            </Styled.CategoryName>
                                        </Styled.Category>
                                        <Styled.Category>
                                            <Styled.CategoryIcon
                                                src={locationIcon}
                                            />
                                            <Styled.CategoryName>
                                                {formatString(project.location)}
                                            </Styled.CategoryName>
                                        </Styled.Category>
                                    </Styled.Categories>
                                </Styled.ImageContainer>
                                <Styled.Funding>
                                    <Styled.ProgressBar>
                                        <Styled.Progress progress={calculateProgress(project.fundingGoal, project.moneyBacked)}></Styled.Progress>
                                    </Styled.ProgressBar>
                                    <Styled.FundsContainer>
                                        <Styled.Funds>
                                            <Styled.FundingMoney>
                                                ${formatNumber(project.moneyBacked)}
                                            </Styled.FundingMoney>
                                            <Styled.FundingText>
                                                out of
                                                <Styled.MoneyGoal>${formatNumber(project.fundingGoal)}</Styled.MoneyGoal>
                                                goal
                                            </Styled.FundingText>
                                        </Styled.Funds>
                                        <Styled.Funds>
                                            <Styled.FundingNumber>
                                                {project.backers}
                                            </Styled.FundingNumber>
                                            <Styled.FundingText color="${props => props.theme.font}">
                                                backers
                                            </Styled.FundingText>
                                        </Styled.Funds>
                                    </Styled.FundsContainer>
                                    <Styled.BackProject>
                                        {
                                            sessionStorage.getItem("userId") === project.documentId ?
                                                <div
                                                    className="back-project-btn delete"
                                                    onClick={handleDeleteProject}
                                                >
                                                    Delete my project
                                                </div>
                                                :
                                                <Styled.Button
                                                    onClick={handleDonateToProject}
                                                >
                                                    Back this project
                                                </Styled.Button>
                                        }
                                    </Styled.BackProject>
                                </Styled.Funding>
                            </Styled.Info>
                        </Styled.Project>
                    );
                })
            }
        </Styled.Container>
    );
}

export default CurrentProject;