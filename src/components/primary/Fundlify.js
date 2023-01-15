import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    getAuth,
    onAuthStateChanged,
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
import FundProject from "../secondary/FundProject";
import DonationFinished from "../secondary/DonationFinished";
import HowItWorks from "./HowItWorks";
import '../../styles/fundlify.css';

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

    const [currentProjectId, setCurrentProjectId] = useState("");

    const auth = getAuth();
    const db = getFirestore();
    const storage = getStorage(app);

    const colRef = collection(db, "users");

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



    return (
        <div className="app">
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
                        auth={auth}
                        userLoggedIn={userLoggedIn}
                        setUpdateId={setUpdateId}
                        db={db}
                    />} />
                    <Route path="/edit-profile/:profileName" element={<EditProfile
                        userLoggedIn={userLoggedIn}
                        auth={auth}
                        user={user}
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
                            db={db}
                            currentProjectId={currentProjectId}
                        />
                    } />
                    <Route path="/discover" element={
                        <Discover
                            auth={auth}
                            db={db}
                            storage={storage}
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
                            userLoggedIn={userLoggedIn}
                            preventLetters={preventLetters}
                            preventNumbers={preventNumbers}
                        />
                    } />
                    <Route path="/donation-finished" element={<DonationFinished />} />
                    <Route path="/how-it-works" element={<HowItWorks userLoggedIn={userLoggedIn} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Fundlify;