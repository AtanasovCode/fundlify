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


    const handleCutString = (string, index) => { //Replace the string after a certain point with '...'
        let result = string;
        if (string.length > index) {
            result = string.slice(0, index).trimEnd() + "...";
        }

        return result;
    }

    return (
        <Styled.Container>
            <Nav
                userLoggedIn={userLoggedIn}
                grow={true}
                sticky={true}
            />
            <Styled.Heading>
                Profile
            </Styled.Heading>
            {
                isLoading &&
                <Styled.LoadingContainer>
                    <Loading />
                </Styled.LoadingContainer>
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
                                            {handleCutString(user.location ? user.location : "Mystery", 20)}
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
            <Styled.ProjectsBacked key={user.userId}>
                <Styled.Filters>
                    <Styled.BackedFilter
                        id="backed"
                        active={categorySelected === "backed" ? true : false}
                        onClick={(e) => handleSwitchCategory(e)}
                    >
                        Projects backed
                    </Styled.BackedFilter>
                    <Styled.UserFilter
                        id="users"
                        active={categorySelected === "users" ? true : false}
                        onClick={(e) => handleSwitchCategory(e)}
                    >
                        My Project
                    </Styled.UserFilter>
                </Styled.Filters>
                <Styled.Projects
                    user={categorySelected != "backed" ?
                        true
                        :
                        false
                    }
                    center={projectsDonatedTo.length > 0 ? false : true}
                    center={userProject.length > 0  ? false : true}
                >
                {
                    categorySelected === "backed" ?
                        projectsDonatedTo.length > 0 ?
                            projectsDonatedTo.map((project) => {
                                return (
                                    <DisplayProfileProjects
                                        key={project.documentId}
                                        project={project}
                                        formatNumber={formatNumber}
                                        handleProjectClick={handleProjectClick}
                                    />
                                );
                            })
                            : //If there are no donated projects
                            <Styled.NoProjects>
                                No projects found,
                                <Styled.NoProjectsLink to="/discover">
                                    explore projects?
                                </Styled.NoProjectsLink>
                            </Styled.NoProjects>
                        :
                        userProject.length > 0 ?
                            userProject.map((project) => {
                                return (
                                    <DisplayProfileProjects
                                        key={project.documentId}
                                        childKey={project.documentId}
                                        project={project}
                                        formatNumber={formatNumber}
                                        handleProjectClick={handleProjectClick}
                                    />
                                );
                            })
                            :
                            <Styled.NoProjects>
                                No project found,
                                <Styled.NoProjectsLink to="/create-project/start">
                                    crate a new project?
                                </Styled.NoProjectsLink>
                            </Styled.NoProjects>
                }
            </Styled.Projects>
        </Styled.ProjectsBacked>
        </Styled.Container >
    );
}


export default Profile;

const DisplayProfileProjects = ({
    project,
    handleProjectClick,
    formatNumber,
}) => {
    return (
        <Styled.Project
            onClick={() => {
                sessionStorage.setItem("currentProjectId", project.documentId);
                handleProjectClick();
            }}
        >
            <Styled.ProjectImageContainer>
                <Styled.ProjectImage
                    src={project.projectImageUrl}
                    alt="official image of the project"
                />
            </Styled.ProjectImageContainer>
            <Styled.ProjectInfo>
                <Styled.ProjectTitle>
                    {project.projectTitle}
                </Styled.ProjectTitle>
                <Styled.ProjectFunding>
                    <Styled.Money>
                        ${formatNumber(project.moneyBacked)}
                    </Styled.Money> Raised
                </Styled.ProjectFunding>
            </Styled.ProjectInfo>
        </Styled.Project>
    );
}