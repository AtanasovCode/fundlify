import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Styled from '../../styles/Homepage.Styled';
import {
    onSnapshot,
    collection,
    query,
    orderBy,
} from 'firebase/firestore';
import ProjectStats from './homepage-sections/ProjectStats';
import Nav from '../secondary/Nav';
import NoPermission from '../secondary/NoPermission';
import '../../styles/homepage.css';
import illustration from '../../images/icons/illustration.svg';
import categoryIcon from '../../images/icons/category.png';
import subCategoryIcon from '../../images/icons/sub-category.png';
import group from '../../images/icons/group.png';
import arrow from '../../images/icons/arrow.png';
import close from '../../images/icons/close.png';

const HomePage = ({
    userLoggedIn,
    auth,
    db,
    userInfo,
    user,
    formatNumber,
}) => {

    const [navClass, setNavClass] = useState("nav-container");
    const [projects, setProjects] = useState([]);
    const [totalProjects, setTotalProjects] = useState(0);
    const [totalFundsRaised, setTotalFundsRaised] = useState();
    const [backers, setBackers] = useState(0);
    const [username, setUsername] = useState("");
    const [loginBox, setLoginBox] = useState(false);
    const [popularProjects, setPopularProjects] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);

    const colRef = collection(db, "projects");
    const q = query(colRef, orderBy("moneyBacked", "desc"));
    const navigate = useNavigate();

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const handleShowPopUp = () => {
        setShowPopUp(true);
    }

    const handleClosePopUp = () => {
        setShowPopUp(false);
    }


    useEffect(() => {
        onSnapshot(colRef, (snapshot) => {
            let project = [];
            snapshot.docs.forEach((doc) => {
                project.push({ ...doc.data(), id: doc.id });
            })
            setProjects(project);
        })
    }, [])

    useEffect(() => {
        onSnapshot(q, (snapshot) => {
            let project = [];
            snapshot.docs.forEach((doc) => {
                project.push({ ...doc.data(), id: doc.id });
            })
            setPopularProjects(project);

        })
    }, [])

    const formatString = (string) => {
        string = string.replace(/-/g, ' ');
        return string.replace(/\b\w/g, l => l.toUpperCase())
    }

    let total = 0;
    let totalBackers = 0;
    let totalFunds = 0;

    useEffect(() => {
        if (projects) {
            projects.map((project) => {
                total++;
                totalBackers += project.backers;
                totalFunds += project.moneyBacked;
            })
            setTotalFundsRaised(totalFunds);
            setTotalProjects(total);
            setBackers(totalBackers);
        }
    }, [projects])

    const handleAddProject = () => {
        if (userLoggedIn) {
            if (userInfo) {
                userInfo.map((user) => {
                    if (user.IsProjectOwner) {
                        handleShowPopUp();
                    } else {
                        navigate("/create-project/start");
                    }
                })
            }
        } else {
            setLoginBox(true);
        }
    }

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

    return (
        <Styled.Container>
            <Styled.Navigation>
                <Nav
                    userLoggedIn={userLoggedIn}
                    auth={auth}
                    user={user}
                />
                <Styled.NavigationImage>
                    {/*Image Goes Here*/}
                </Styled.NavigationImage>
                {
                    loginBox &&
                    <Styled.LoginBox onClick={() => handleAddProject}>
                        <Styled.CloseIcon
                            src={close}
                            alt="close icon"
                            onClick={() => {
                                setLoginBox(false);
                            }}
                        />
                        <Styled.BoxInfo>
                            <Styled.BoxHeading>
                                <Styled.BoxTitle>
                                    Join Us!
                                </Styled.BoxTitle>
                                <Styled.BoxSubtitle>
                                    Join hundreds of others today and
                                    turn your dream project into
                                    a reality.
                                </Styled.BoxSubtitle>
                            </Styled.BoxHeading>
                            <Styled.BoxJoin to="/sign-up" >
                                Sign Up
                            </Styled.BoxJoin>
                        </Styled.BoxInfo>
                    </Styled.LoginBox>
                }
                <NoPermission
                    permissionType="project"
                    showPopUp={showPopUp}
                    handleClosePopUp={handleClosePopUp}
                />
                <div
                    className="add-project-btn-container"
                    onClick={handleAddProject}
                >
                    <div className="add-project-text">
                        Add Fundlify Project
                    </div>
                    <img
                        src={group}
                        className="group-icon"
                        alt="group icon"
                    />
                </div>
            </Styled.Navigation>
            <ProjectStats 
                formatNumber={formatNumber}
                totalProjects={totalProjects}
                totalFundsRaised={totalFundsRaised}
                backer={backers}

            />
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
            <div className="most-popular-container">
                <div className="most-popular-title">
                    Discover popular projects
                </div>
                <div className="popular-projects-container">
                    <div className="main-project-container">
                        {
                            popularProjects.map((project, i) => {
                                if (i === 0) {
                                    return (
                                        <div
                                            className="main-project"
                                            key={project.documentId}
                                            onClick={() => {
                                                sessionStorage.setItem("currentProjectId", project.documentId);
                                                navigate(`/projects/${project.documentId}`);
                                            }}
                                        >
                                            <div className="main-project-img-container">
                                                <img
                                                    src={project.projectImageUrl}
                                                    className="main-project-img"
                                                />
                                            </div>
                                            <div className="main-project-info">
                                                <div className="main-project-heading">
                                                    <div className="main-project-name">
                                                        {project.projectTitle}
                                                    </div>
                                                    <div className="main-project-desc">
                                                        {project.projectDescription}
                                                    </div>
                                                </div>
                                                <div className="main-project-made-by">
                                                    By: {project.createdBy}
                                                </div>
                                                <div className="percent-funded">
                                                    {calculateProgress(project.fundingGoal, project.moneyBacked)}%
                                                    funded
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            })
                        }
                    </div>
                    <div className="side-projects-container">
                        {
                            popularProjects.map((project, i) => {
                                if (i > 0 && i <= 3) {
                                    return (
                                        <div
                                            className="side-project"
                                            key={project.documentId}
                                            onClick={() => {
                                                sessionStorage.setItem("currentProjectId", project.documentId);
                                                navigate(`/projects/${project.documentId}`);
                                            }}
                                        >
                                            <div className="side-project-img-container">
                                                <img
                                                    src={project.projectImageUrl}
                                                    className="side-project-img"
                                                />
                                            </div>
                                            <div className="side-project-info">
                                                <div className="side-project-heading">
                                                    <div className="side-project-name">
                                                        {project.projectTitle}
                                                    </div>
                                                    <div className="side-project-made-by">
                                                        By: {project.createdBy}
                                                    </div>
                                                </div>
                                                <div className="side-project-percent">
                                                    {calculateProgress(project.fundingGoal, project.moneyBacked)}%
                                                    funded
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="get-started-container">
                <div className="get-started-text-container">
                    <div className="get-started-heading">
                        Ready to get started?
                        Join thousands of others today!
                    </div>
                    <div className="get-started-btn">
                        <Link
                            to="/sign-up"
                            className="create-acc-btn started-btn"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/how-it-works"
                            className="how-it-works-btn started-btn"
                        >
                            How it works
                        </Link>
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
        </Styled.Container>
    );
}

export default HomePage;