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
import ProjectSteps from './homepage-sections/ProjectSteps';
import ExploreProjects from './homepage-sections/ExploreProjects';
import GetStarted from './homepage-sections/GetStarted';
import Nav from '../secondary/Nav';
import NoPermission from '../secondary/NoPermission';
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



    useEffect(() => {
        let total = 0;
        let totalBackers = 0;
        let totalFunds = 0;
        if (projects) {
            projects.map((project) => {
                total++;
                totalBackers += parseInt(project.backers);
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
                    setShowPopUp={setShowPopUp}
                />
                <Styled.Button
                    onClick={handleAddProject}
                >
                    <Styled.ButtonText>
                        Add Fundlify Project
                    </Styled.ButtonText>
                    <Styled.ButtonImage
                        src={group}
                        alt="group icon"
                    />
                </Styled.Button>
            </Styled.Navigation>
            <ProjectStats 
                formatNumber={formatNumber}
                totalProjects={totalProjects}
                totalFundsRaised={totalFundsRaised}
                backers={backers}
            />
            <ProjectSteps />
            <ExploreProjects 
                popularProjects={popularProjects}
                navigate={navigate}
                calculateProgress={calculateProgress}
            />
            <GetStarted 
                Link={Link}
                illustration={illustration}
            />
        </Styled.Container>
    );
}

export default HomePage;