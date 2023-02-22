import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import * as Styled from '../../styles/Fundlify.Styled';
import {
    getAuth,
    onAuthStateChanged,
    signOut,
} from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    updateDoc,
    serverTimestamp,
    doc,
    docs,
    query,
    where,
    onSnapshot,
    orderBy,
} from 'firebase/firestore';
import {
    getStorage
} from 'firebase/storage';

import HomePage from "./HomePage";
import SignIn from "../secondary/SignIn";
import SignUp from "../secondary/SignUp";
import Profile from "./Profile";
import EditProfile from "../secondary/EditProfile";
import CreateProject from "./CreateProject";
import ProjectLocation from "../secondary/ProjectLocation";
import StartProject from "../secondary/StartProject";
import ProjectBasics from "../secondary/ProjectBasics";
import ProjectRewards from "../secondary/ProjectRewards";
import Congratulations from "../secondary/Congratulations";
import CurrentProject from "../secondary/CurrentProject";
import Discover from "./Discover";
import FundProject from "../primary/FundProject";
import DonationFinished from "../secondary/DonationFinished";
import HowItWorks from "./HowItWorks";


const theme = {
    background: "#010400", //"#111715", //"#0F1F2C",

    font: "#F9F9F9",
    fadedFont: "#888",
    creative: "rgb(97, 136, 255)",
    fontMoney: "#38E000",
    logoColor: "#F9F9F9",
    fontFamily: "",

    tint: "rgba(0, 0, 0, .666)",
    lightTint: "rgba(0, 0, 0, .444)",

    borderBg: "",
    borderFaded: "#FFFFFF40",

    progressBar: "rgb(52, 49, 49);",
    progress: "#38E000",

    defaultBtn: "#75DDDD",
    defaultBtnHover: "#75FFFF",
    fundButton: "#68274A",
    fundButtonHover: "#943869",
    addProjectBtn: "#111715",
    addProjectBtnHover: "#1d2522",
    authBtn: "transparent",
    authBtnHover: "",
    googleAuthBtn: "#F7F4F3",
    googleAuthBtnHover: "",
    howItWorksBtn: "#68274A",
    howItWorksBtnHover: "#943869",
    getStartedBtn: "#2B2F23",
    getStartedBtnHover: "#404634",
    pledgeBtn: "#09BC8A",
    pledgeBtnHover: "",

    stepsBackground: "#F0F0C9", //"linear-gradient(to right, #010400 50%, #69121D, #B01C41)", //"#15258E",
    stepsFontColor: "#010400",
    stepsFadedFont: "#ffffff90",
    stepIconBg: "#010400",

    filterColor: "#222",
    filterColorActive: "#F9F9F9",

    editProfileBorder: "#943869",
}

const Fundlify = ({ app }) => {

    const [user, setUser] = useState({});
    const [userInfo, setUserInfo] = useState([]);
    const [userLoggedIn, setUserLoggedIn] = useState();
    const [updateId, setUpdateId] = useState("");

    const [categorySelected, setCategorySelected] = useState("");
    const [subCategorySelected, setSubCategorySelected] = useState("");

    const [locationSelected, setLocationSelected] = useState("");

    const [projectTitle, setProjectTitle] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [fundingGoal, setFundingGoal] = useState("");

    const [tierOneName, setTierOneName] = useState("");
    const [tierTwoName, setTierTwoName] = useState("");
    const [tierThreeName, setTierThreeName] = useState("");

    const [reward1, setReward1] = useState("");
    const [reward2, setReward2] = useState("");
    const [reward3, setReward3] = useState("");

    const [pledge1, setPledge1] = useState("");
    const [pledge2, setPledge2] = useState("");
    const [pledge3, setPledge3] = useState("");

    const [projects, setProjects] = useState([]);
    const [userHasProject, setUserHasProject] = useState(false);

    const [currentProjectId, setCurrentProjectId] = useState("");

    const auth = getAuth();
    const db = getFirestore();
    const storage = getStorage(app);

    const colRef = collection(db, "users");



    //Handle what happens when 
    //A user is logged in.
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const q = query(colRef, where("userId", "==", currentUser.uid))
                sessionStorage.setItem("userId", currentUser.uid);
                onSnapshot(q, (snapshot) => {
                    let getUser = [];
                    snapshot.docs.forEach((doc) => {
                        getUser.push({ ...doc.data(), id: doc.id });
                    })
                    setUserInfo(getUser);
                })
                setUser(currentUser);
                setUserLoggedIn(true);
            } else {
                setUserLoggedIn(false);
                setUserInfo([]);
            }
        })
    }, [])


    //Get all the projects from the database to check if
    //The user currently logged in has a project made
    useEffect(() => {
        onSnapshot((collection(db, "projects")), (snapshot) => {
            let project = [];
            snapshot.docs.forEach((doc) => {
                project.push({ ...doc.data(), id: doc.id });
            })
            setProjects(project)
        })
    }, [])

    //Map through all the projects and check to see if 
    //The currently logged in user's uid matches the userId of any of the projects
    //If it does, update the user's document.
    useEffect(() => {
        projects.map((project) => {
            if (project.userId === sessionStorage.getItem("userId")) {
                updateDoc((doc(db, "users", `${sessionStorage.getItem("userId")}`)), {
                    IsProjectOwner: true,
                })
                    .then(() => {
                        console.log("profile updated");
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })
            }
        })
    }, [projects])


    useEffect(() => {
        if (userLoggedIn) {
            sessionStorage.setItem("username", user.displayName);
        }
    }, [userLoggedIn])

    const formatNumber = (number) => {
        return parseInt(number).toLocaleString('en-US');
    }

    const preventNumbers = (e) => {
        if (/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    }

    const preventLetters = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    }

    const formatTextForURL = (text) => {
        return text == undefined ? '' : text.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
    }



    return (
        <ThemeProvider theme={theme}>
            <Styled.App>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage
                            userLoggedIn={userLoggedIn}
                            auth={auth}
                            db={db}
                            userInfo={userInfo}
                            formatNumber={formatNumber}
                        />} />
                        <Route path="/users/:username" element={<Profile
                            user={user}
                            setUser={setUser}
                            userInfo={userInfo}
                            projects={projects}
                            auth={auth}
                            userLoggedIn={userLoggedIn}
                            setUpdateId={setUpdateId}
                            db={db}
                        />} />
                        <Route path="/edit-profile/:profileName" element={<EditProfile
                            userLoggedIn={userLoggedIn}
                            auth={auth}
                            user={user}
                            setUser={setUser}
                            userInfo={userInfo}
                            setUpdateId={setUpdateId}
                            updateId={updateId}
                            db={db}
                        />} />
                        <Route path="/create-project" element={<CreateProject
                            user={user}
                            db={db}
                            auth={auth}
                            userLoggedIn={userLoggedIn}
                        />} >
                            <Route path="/create-project/start" element={
                                <StartProject
                                    db={db}
                                    auth={auth}
                                    user={user}
                                    categorySelected={categorySelected}
                                    setCategorySelected={setCategorySelected}
                                    setSubCategorySelected={setSubCategorySelected}
                                    subCategorySelected={subCategorySelected}
                                    setCurrentProjectId={setCurrentProjectId}
                                />
                            } />
                            <Route path="/create-project/project-location" element={
                                <ProjectLocation
                                    db={db}
                                    auth={auth}
                                    user={user}
                                    locationSelected={locationSelected}
                                    setLocationSelected={setLocationSelected}
                                />
                            } />
                            <Route path="/create-project/project-basics" element={
                                <ProjectBasics
                                    db={db}
                                    auth={auth}
                                    storage={storage}
                                    user={user}

                                    projectTitle={projectTitle}
                                    setProjectTitle={setProjectTitle}
                                    projectDescription={projectDescription}
                                    setProjectDescription={setProjectDescription}
                                    fundingGoal={fundingGoal}
                                    setFundingGoal={setFundingGoal}

                                    preventLetters={preventLetters}
                                    preventNumbers={preventNumbers}
                                />
                            } />
                            <Route path="/create-project/project-rewards" element={
                                <ProjectRewards
                                    db={db}
                                    auth={auth}
                                    user={user}
                                    storage={storage}

                                    preventLetters={preventLetters}
                                    preventNumbers={preventNumbers}

                                    tierOneName={tierOneName}
                                    setTierOneName={setTierOneName}
                                    tierTwoName={tierTwoName}
                                    setTierTwoName={setTierTwoName}
                                    tierThreeName={tierThreeName}
                                    setTierThreeName={setTierThreeName}

                                    reward1={reward1}
                                    setReward1={setReward1}
                                    reward2={reward2}
                                    setReward2={setReward2}
                                    reward3={reward3}
                                    setReward3={setReward3}

                                    pledge1={pledge1}
                                    setPledge1={setPledge1}
                                    pledge2={pledge2}
                                    setPledge2={setPledge2}
                                    pledge3={pledge3}
                                    setPledge3={setPledge3}

                                    storage={storage}
                                    currentProjectId={currentProjectId}

                                />
                            } />
                            <Route path="/create-project/congratulations" element={
                                <Congratulations />
                            } />
                        </Route>
                        <Route path="/sign-in" element={<SignIn auth={auth} />} />
                        <Route path="/sign-up" element={<SignUp auth={auth} db={db} user={user} userLoggedIn={userLoggedIn} />} />
                        <Route path="/projects/:projectId" element={
                            <CurrentProject
                                user={user}
                                userLoggedIn={userLoggedIn}
                                userInfo={userInfo}
                                db={db}
                                currentProjectId={currentProjectId}
                                formatTextForURL={formatTextForURL}
                            />
                        } />
                        <Route path="/discover" element={
                            <Discover
                                auth={auth}
                                db={db}
                                storage={storage}
                                formatTextForURL={formatTextForURL}
                                user={user}
                                userLoggedIn={userLoggedIn}
                                setCurrentProjectId={setCurrentProjectId}
                            />
                        } />
                        <Route path="/fund-project/:projectId" element={
                            <FundProject
                                user={user}
                                db={db}
                                auth={auth}
                                formatTextForURL={formatTextForURL}
                                userLoggedIn={userLoggedIn}
                                preventLetters={preventLetters}
                                preventNumbers={preventNumbers}
                            />
                        } />
                        <Route path="/donation-finished" element={<DonationFinished />} />
                        <Route path="/how-it-works" element={<HowItWorks userLoggedIn={userLoggedIn} />} />
                    </Routes>
                </BrowserRouter>
            </Styled.App>
        </ThemeProvider>
    );
}

export default Fundlify;