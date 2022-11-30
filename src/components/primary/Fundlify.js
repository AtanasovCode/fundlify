import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    getAuth,
    onAuthStateChanged,
} from 'firebase/auth';

import HomePage from "./HomePage";
import SignIn from "../secondary/SignIn";
import SignUp from "../secondary/SignUp";
import Profile from "./Profile";
import '../../styles/fundlify.css';

const Fundlify = () => {

    const [user, setUser] = useState({});
    const [userLoggedIn, setUserLoggedIn] = useState();

    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if(currentUser) {
                setUser(currentUser);
                setUserLoggedIn(true);
            } else {
                setUserLoggedIn(false);
            }
        })
        console.log(userLoggedIn);
    }, [])


    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage 
                        userLoggedIn={userLoggedIn}
                        auth={auth}
                    />} />
                    <Route path="/profile" element={<Profile user={user} auth={auth} />} />
                    <Route path="/sign-in" element={<SignIn auth={auth} />} />
                    <Route path="/sign-up" element={<SignUp auth={auth} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Fundlify;