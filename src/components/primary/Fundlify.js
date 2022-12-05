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
import '../../styles/fundlify.css';

const Fundlify = () => {

    const [user, setUser] = useState({});
    const [userInfo, setUserInfo] = useState([]);
    const [userLoggedIn, setUserLoggedIn] = useState();
    const [updateId, setUpdateId] = useState("");

    const [categorySelected, setCategorySelected] = useState("");
    const [subCategorySelected, setSubCategorySelected] = useState("");

    const auth = getAuth();
    const db = getFirestore();

    const colRef = collection(db, "users");

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const q = query(colRef, where("userId", "==", currentUser.uid))
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


    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage
                        userLoggedIn={userLoggedIn}
                        auth={auth}
                    />} />
                    <Route path="/profile" element={<Profile
                        user={user}
                        setUser={setUser}
                        userInfo={userInfo}
                        auth={auth}
                        userLoggedIn={userLoggedIn}
                        setUpdateId={setUpdateId}
                        db={db}
                    />} />
                    <Route path="/edit-profile" element={<EditProfile
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
                                categorySelected={categorySelected}
                                setCategorySelected={setCategorySelected}
                                setSubCategorySelected={setSubCategorySelected}
                                subCategorySelected={subCategorySelected}
                            />
                        } />
                        <Route path="/create-project/project-location" element={
                            <ProjectLocation />
                        } />
                        <Route
                            path="/create-project/project-basics"
                            element={<ProjectBasics />}
                        />
                        <Route
                            path="/create-project/project-rewards"
                            element={<ProjectRewards />}
                        />
                        <Route path="/create-project/congratulations" element={<Congratulations />} />
                    </Route>
                    <Route path="/sign-in" element={<SignIn auth={auth} />} />
                    <Route path="/sign-up" element={<SignUp auth={auth} db={db} user={user} userLoggedIn={userLoggedIn} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Fundlify;