import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/auth-page.css';
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithRedirect,
    signInWithPopup,
} from 'firebase/auth';

const SignIn = ({ auth }) => {
    
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, mail, password)
            .then(() => {
                setMail("");
                setPassword("");
                navigate("../", { replace: true });
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    const handleSignInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((currentUser) => {
                setMail("");
                setPassword("");
                navigate("../", { replace: true });
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    return (
        <div className="auth-container">
            <div className="auth-nav-container">
                <Link
                    className="auth-logo"
                    to="/"
                >
                    Fundlify
                </Link>
            </div>
            <div className="auth-form-container sign-in-form">
                <div className="auth-heading">Sign In</div>
                <input
                    type="email"
                    placeholder="Email"
                    className="auth-input"
                    name="mail"
                    value={mail}
                    onChange={(e) => setMail(e.currentTarget.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="auth-input"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <input
                    type="button"
                    value="Sign in"
                    className="auth-btn"
                    onClick={handleSignIn}
                />
                <div className="other-options-container">
                    or
                    <div className="sign-up-google" onClick={handleSignInWithGoogle}>
                        Continue with Google
                    </div>
                </div>
                <div className="auth-change">
                    New to Fundlify?
                    <Link to="/sign-up" className="link">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default SignIn;