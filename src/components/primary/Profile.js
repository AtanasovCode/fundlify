import pfp from '../../images/icons/pfp.avif';
import '../../styles/profile.css';
import Nav from '../secondary/Nav';
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

    let navigate = useNavigate();
    const colRef = collection(db, "users");
    const projectRef = collection(db, "projects");


    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setUser({});
                navigate("../", { replace: true })
            })
    }

    useEffect(() => {
        userInfo.forEach((info) => {
            sessionStorage.setItem("updateId", info.id)
        })
    }, [])

    const formatTextForURL = (text) => {
        return text == undefined ? '' : text.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
    }

    const handleSwitchCategory = (e) => {
        setCategorySelected(e.currentTarget.id);
    }

    useEffect(() => {
        let projectsDonated = [];
        userInfo.map((user, i) => {
            user.projectsDonatedTo.map((projectId) => {
                let temp = projects.find(element => element.documentId === projectId);
                projectsDonated.push(temp);
            })
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


    useEffect(() => {
        console.log(userProject);
    }, [userProject])


    const formatNumber = (number) => {
        return parseInt(number).toLocaleString('en-US');
    }

    const handleProjectClick = () => {
        navigate(`../projects/${sessionStorage.getItem("currentProjectId")}`)
    }


    return (
        <div className="profile-container">
            <Nav
                userLoggedIn={userLoggedIn}
                grow={grow}
            />
            <div className="profile-title-container">
                Profile
            </div>
            {userInfo.map((user) => {
                return (
                    <div className="profile-info-container" key={user.userId}>
                        <div className="profile-info">
                            <div className="profile-icon-container">
                                <img
                                    src={pfp}
                                    alt="profile picture"
                                    className="pfp"
                                />
                                <Link
                                    to={`/edit-profile/${formatTextForURL(sessionStorage.getItem("username"))}`}
                                    className="edit-profile"
                                >
                                    Edit Profile
                                </Link>
                            </div>
                            <div className="profile-name-container">
                                <div className="profile-display-name">
                                    {user.username}
                                </div>
                                <div className="profile-location-container">
                                    <div className="profile-location">
                                        {user.location ? user.location : ""}
                                    </div>
                                </div>
                                <div className="projects-backed-container">
                                    Projects Backed {user.projectsBacked ? user.projectsBacked : 0}
                                </div>
                            </div>
                        </div>
                        <div className="profile-desc">
                            {user.bio}
                        </div>
                    </div>
                );
            })}
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
                <div className="projects-backed">
                    {
                        categorySelected === "backed" ?
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
                            userProject.map((project) => {
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
                    }
                </div>
            </div>
        </div>
    );
}

export default Profile;