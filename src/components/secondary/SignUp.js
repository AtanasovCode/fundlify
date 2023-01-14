import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import '../../styles/sign-up.css';
import {
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithRedirect,
    signInWithPopup,
} from 'firebase/auth';
import {
    collection,
    addDoc,
    setDoc,
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
    const provider = new GoogleAuthProvider();

    const handleSignUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, regMail, regPassword)
            .then((currentUser) => {
                updateProfile(auth.currentUser, {
                    displayName: name,
                    userId: currentUser.uid,
                })
                setDoc(doc(db, "users", `${currentUser.user.uid}`), {
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

    const handleSignUpWithGoogle = () => {
        if ((window.innerWidth > 800 || document.documentElement.clientWidth > 800)) {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    //The sign in user info
                    const user = result.user;

                    updateProfile(user, {
                        displayName: user.email.split('@')[0],
                        userId: user.uid,
                    })
                        .catch((err) => {
                            alert(err.message);
                        })
                    setDoc(doc(db, "users", `${user.uid}`), {
                        username: user.email.split('@')[0],
                        userId: user.uid,
                        bio: "I am a mysterious person that has not yet updated their bio.",
                        location: false,
                        projectsBacked: false,
                        createdAt: serverTimestamp(),
                    })
                        .then(() => {
                            setRegMail("");
                            setRegPassword("");
                            setName("");
                            navigate("../", { replace: true });
                        })
                })
                .catch((err) => {
                    //Handle Error
                    const errorCode = err.code;
                    const errorMessage = err.message;
                    //The email of the user account used
                    const email = err.customData.email;

                    alert("Error with account" + " " + email + "\n" + "Error code:" + errorCode + "\n" + "Error Message:" + " " + errorMessage);
                })
        }
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
                    <div className="sign-up-google" onClick={handleSignUpWithGoogle}>
                        Sign Up With Google
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;