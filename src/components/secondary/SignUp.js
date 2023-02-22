import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Styled from '../../styles/Auth.Styled';
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
                    location: "Mystery",
                    createdAt: serverTimestamp(),
                    projectsBacked: 0,
                    projectsDonatedTo: [],
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
                        createdAt: serverTimestamp(),
                        projectsBacked: 0,
                        projectsDonatedTo: [],
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
        <Styled.Container>
            <Styled.Logo to="/" >
                Fundlify
            </Styled.Logo>
            <Styled.SignIn>
                <Styled.Heading>
                    Sign Up
                </Styled.Heading>
                <Styled.Input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    maxLength={35}
                    onChange={(e) => setName(e.currentTarget.value)}
                />
                <Styled.Input
                    type="email"
                    placeholder="Email"
                    name="mail"
                    maxLength={40}
                    value={regMail}
                    onChange={(e) => setRegMail(e.currentTarget.value)}
                />
                <Styled.Input
                    type="password"
                    placeholder="Password"
                    maxLength={35}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.currentTarget.value)}
                />
                <Styled.Input
                    type="button"
                    value="Create Account"
                    className="auth-btn"
                    onClick={handleSignUp}
                />
                <Styled.AlternateOption>
                    or
                    <Styled.InputGoogle 
                        onClick={handleSignUpWithGoogle}
                        type="button"
                        value="Sign op with Google"
                    />
                </Styled.AlternateOption>
                <Styled.Agreement>
                    By signing up you agree to our
                    <Styled.A>
                        Privacy Policy,
                        Cookie Policy
                    </Styled.A>
                    and
                    <Styled.A>
                        Terms of Use
                    </Styled.A>
                </Styled.Agreement>
                <Styled.NewUser>
                    Already Have An Account?
                    <Styled.A to="/sign-in">Sign In</Styled.A>
                </Styled.NewUser>
            </Styled.SignIn>
        </Styled.Container>
    );
}

export default SignUp;