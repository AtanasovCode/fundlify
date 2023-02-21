import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import {
    signOut,
} from 'firebase/auth';
import {
    collection,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';

import * as Styled from '../../styles/Profile.Styled';
import Loading from '../secondary/Loading';
import Nav from '../secondary/Nav';

import pfp from '../../images/icons/pfp.avif';
import location from '../../images/icons/location.png';
import backers from '../../images/icons/sub-category.png';

import '../../styles/profile.css';



const Profile = ({
    user,
    setUser,
    userInfo,
    auth,
    userLoggedIn,
    db,
    setUpdateId,
    projects,
}) => {

    const [grow, setGrow] = useState(true);
    const [projectsDonatedTo, setProjectsDonatedTo] = useState([]);
    const [categorySelected, setCategorySelected] = useState("backed");
    const [userProject, setUserProject] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    let navigate = useNavigate();
    const colRef = collection(db, "users");
    const projectRef = collection(db, "projects");


    useEffect(() => {
        userInfo.forEach((info) => {
            sessionStorage.setItem("updateId", info.id)
        })
    }, [])

    useEffect(() => {
        if (userInfo.length !== 0 && projects.length !== 0) setIsLoading(false);
    }, [userInfo, projects])

    const formatTextForURL = (text) => {
        return text == undefined ? '' : text.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
    }

    const handleSwitchCategory = (e) => {
        setCategorySelected(e.currentTarget.id);
    }

    useEffect(() => {
        let projectsDonated = [];
        userInfo.map((user, i) => {
            if (user.projectsDonatedTo.length > 0) {
                user.projectsDonatedTo.map((projectId) => {
                    let temp = projects.find(element => element.documentId === projectId);
                    projectsDonated.push(temp);
                })
            }
        })
        setProjectsDonatedTo(projectsDonated)
    }, [userInfo, projects])


    useEffect(() => {
        let userId = "";
        userInfo.map((user) => {
            userId = user.userId;
        })
        const q = query(projectRef, where("documentId", "==", userId))
        onSnapshot(q, (snapshot) => {
            let project = [];
            snapshot.docs.forEach((doc) => {
                project.push({ ...doc.data(), id: doc.id });
            })
            setUserProject(project);
        })
    }, [userInfo])



    const formatNumber = (number) => {
        return parseInt(number).toLocaleString('en-US');
    }

    const handleProjectClick = () => {
        navigate(`../projects/${sessionStorage.getItem("currentProjectId")}`)
    }


    return (
        <Styled.Container>
            <Nav
                userLoggedIn={userLoggedIn}
                grow={grow}
            />
            <div className="profile-title-container">
                Profile
            </div>
            {
                isLoading ?
                    <div className="loading-container">
                        <Loading />
                    </div>
                    :
                    ""
            }
            {
                userInfo.map((user) => {
                    return (
                        <Styled.Info key={user.userId}>
                            <Styled.ProfileInfo>
                                <Styled.ProfilePhotoContainer>
                                    <Styled.ProfilePhoto
                                        src={pfp}
                                        alt="profile picture"
                                    />
                                    <Styled.EditProfile
                                        to={`/edit-profile/${formatTextForURL(sessionStorage.getItem("username"))}`}
                                    >
                                        Edit Profile
                                    </Styled.EditProfile>
                                </Styled.ProfilePhotoContainer>
                                <Styled.ProfileName>
                                    <Styled.Name>
                                        {user.username}
                                    </Styled.Name>
                                    <Styled.LocationContainer>
                                        <Styled.LocationIcon
                                            src={location}
                                            alt="location icon"
                                        />
                                        <Styled.Location>
                                            {user.location ? user.location : "Mystery"}
                                        </Styled.Location>
                                    </Styled.LocationContainer>
                                    <Styled.BackersContainer>
                                        <Styled.BackersIcon
                                            src={backers}
                                            alt="backers icon"
                                        />
                                        <Styled.Backers>
                                            Projects Backed: {user.projectsBacked}
                                        </Styled.Backers>
                                    </Styled.BackersContainer>

                                </Styled.ProfileName>
                            </Styled.ProfileInfo>
                            <Styled.Description>
                                {user.bio}
                            </Styled.Description>
                        </Styled.Info>
                    );
                })
            }
            <div className="projects-backed-section" key={user.userId}>
                <div className="projects-backed-filter-container">
                    <div
                        className={
                            categorySelected === "backed" ? "projects-backed-section-filter active" : "projects-backed-section-filter"
                        }
                        id="backed"
                        onClick={(e) => handleSwitchCategory(e)}
                    >
                        Projects backed
                    </div>
                    <div
                        className={categorySelected === "my-project" ? "projects-backed-section-filter active" : "projects-backed-section-filter"}
                        id="my-project"
                        onClick={(e) => handleSwitchCategory(e)}
                    >
                        My Project
                    </div>
                </div>
                <div className={categorySelected === "backed" ? "projects-backed" : "projects-backed user-project"}>
                    {
                        categorySelected === "backed" ?
                            projectsDonatedTo.length > 0 ?
                                projectsDonatedTo.map((project) => {
                                    return (
                                        <div
                                            className="project-donated-container"
                                            key={project.documentId}
                                            onClick={() => {
                                                sessionStorage.setItem("currentProjectId", project.documentId);
                                                handleProjectClick();
                                            }}
                                        >
                                            <div className="project-donated-img-container">
                                                <img
                                                    src={project.projectImageUrl}
                                                    className="project-donated-img"
                                                />
                                            </div>
                                            <div className="project-donated-info">
                                                <div className="project-donated-heading">
                                                    {project.projectTitle}
                                                </div>
                                                <div className="project-donated-funding">
                                                    <span className="donated-money">${formatNumber(project.moneyBacked)}</span> Raised
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                                :
                                <div className="no-projects-container">
                                    No projects found,
                                    <Link className="no-projects-link" to="/discover">
                                        explore projects?
                                    </Link>
                                </div>
                            :
                            userProject.length > 0 ?
                                userProject.map((project) => {
                                    return (
                                        <div
                                            className="project-donated-container user-project"
                                            key={project.documentId}
                                            onClick={() => {
                                                sessionStorage.setItem("currentProjectId", project.documentId);
                                                handleProjectClick();
                                            }}
                                        >
                                            <div className="project-donated-img-container">
                                                <img
                                                    src={project.projectImageUrl}
                                                    className="project-donated-img"
                                                />
                                            </div>
                                            <div className="project-donated-info">
                                                <div className="project-donated-heading">
                                                    {project.projectTitle}
                                                </div>
                                                <div className="project-donated-funding">
                                                    <span className="donated-money">${formatNumber(project.moneyBacked)}</span> Raised
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                                :
                                <div className="no-projects-container">
                                    No project found,
                                    <Link className="no-projects-link" to="/create-project/start">
                                        crate a new project?
                                    </Link>
                                </div>
                    }
                </div>
            </div>
        </Styled.Container>
    );
}

export default Profile;