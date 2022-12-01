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
    query,
    where,
    onSnapshot,
} from 'firebase/firestore';

import HomePage from "./HomePage";
import SignIn from "../secondary/SignIn";
import SignUp from "../secondary/SignUp";
import Profile from "./Profile";
import EditProfile from "../secondary/EditProfile";
import '../../styles/fundlify.css';

const Fundlify = () => {

    const [user, setUser] = useState({});
    const [userInfo, setUserInfo] = useState([]);
    const [userLoggedIn, setUserLoggedIn] = useState();

    const auth = getAuth();
    const db = getFirestore();

    const colRef = collection(db, "users");

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setUserLoggedIn(true);
            } else {
                setUserLoggedIn(false);
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
                        auth={auth}
                        userLoggedIn={userLoggedIn}
                        db={db}
                    />} />
                    <Route path="/edit-profile" element={<EditProfile
                        userLoggedIn={userLoggedIn}
                        auth={auth}
                        user={user}
                        db={db}
                    />} />
                    <Route path="/sign-in" element={<SignIn auth={auth} />} />
                    <Route path="/sign-up" element={<SignUp auth={auth} db={db} user={user} userLoggedIn={userLoggedIn} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Fundlify;