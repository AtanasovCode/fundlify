import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../../styles/sign-up.css';
import {
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import {
    collection,
    addDoc,
    serverTimestamp,
    updateDoc,
    doc,
} from 'firebase/firestore'
const SignUp = ({
    auth,
    db,
    user,
    userLoggedIn,
}) => {

    const [regMail, setRegMail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [name, setName] = useState("");


    let navigate = useNavigate();
    const colRef = collection(db, "users");

    const handleSignUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, regMail, regPassword)
            .then((currentUser) => {
                console.log(currentUser);
                updateProfile(auth.currentUser, {
                    displayName: name,
                    userId: currentUser.uid,
                })
                addDoc(colRef, {
                    username: name,
                    userId: currentUser.user.uid,
                    bio: "I am a mysterious person that has not yet updated their bio.",
                    location: false,
                    projectsBacked: false,
                })
                    .then(() => {
                        setRegMail("");
                        setRegPassword("");
                        setName("");
                        navigate("../", { replace: true });
                    })
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    return (
        <div className="auth-container">
            <div className="auth-nav-container">
                <Link 
                    to="/"
                    className="auth-logo"
                >
                    Fundlify
                </Link>
            </div>
            <div className="auth-form-container">
                <div className="auth-heading">Sign Up</div>
                <input
                    type="text"
                    placeholder="Name"
                    className="auth-input"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="auth-input"
                    name="mail"
                    value={regMail}
                    onChange={(e) => setRegMail(e.currentTarget.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="auth-input"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.currentTarget.value)}
                />
                <input
                    type="button"
                    value="Create Account"
                    className="auth-btn"
                    onClick={handleSignUp}
                />
                <div className="agree-container">
                    By signing up you agree to our
                    <span className="link-agree">
                        Privacy Policy,
                        Cookie Policy
                    </span>
                    and
                    <span className="link-agree">
                        Terms of Use
                    </span>
                </div>
                <div className="auth-change">
                    Already Have An Account?
                    <Link to="/sign-in" className="link">Sign In</Link>
                </div>
                <div className="other-options-container">
                    <div>or</div>
                    <div className="sign-up-google">
                        Sign Up With Google
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;