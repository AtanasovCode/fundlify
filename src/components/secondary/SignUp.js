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
    inputFillError,
    inputNameError,
    inputMailError,
    inputPassError,
    setInputMailError,
    setInputNameError,
    setInputPassError,
    checkMail,
}) => {

    const [regMail, setRegMail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [name, setName] = useState("");



    let navigate = useNavigate();
    const colRef = collection(db, "users");
    const provider = new GoogleAuthProvider();


    //Removes the error message if the users switches
    //From Sign Up to Sign In or vide versa
    useEffect(() => { 
        setInputMailError(false);
        setInputPassError(false);
    }, [])

    const handleSignUp = (e) => {
        e.preventDefault();

        regPassword === "" || regPassword.length < 6 ? setInputPassError(true) : setInputPassError(false);
        regMail === "" || checkMail(regMail) === false ? setInputMailError(true) : setInputMailError(false);
        name === "" ? setInputNameError(true) : setInputNameError(false);



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
                <Styled.InputContainer>
                    <Styled.Input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        maxLength={15}
                        inputNameError={inputNameError}
                        onChange={(e) => setName(e.currentTarget.value)}
                    />
                    {
                        inputNameError &&
                        <Styled.InputError>
                            Input must be filled
                        </Styled.InputError>
                    }
                </Styled.InputContainer>
                <Styled.InputContainer>
                    <Styled.Input
                        type="email"
                        placeholder="Email"
                        name="mail"
                        maxLength={40}
                        value={regMail}
                        inputMailError={inputMailError}
                        onChange={(e) => setRegMail(e.currentTarget.value)}
                    />
                    {
                        inputMailError &&
                        <Styled.InputError>
                            Pleas enter a valid e-mail address
                        </Styled.InputError>
                    }
                </Styled.InputContainer>
                <Styled.InputContainer>
                    <Styled.Input
                        type="password"
                        placeholder="Password"
                        maxLength={35}
                        value={regPassword}
                        inputPassError={inputPassError}
                        onChange={(e) => {
                            setRegPassword(e.currentTarget.value)
                        }}
                    />
                    {
                        inputPassError &&
                        <Styled.InputError>
                            Password must be at least 6 characters long
                        </Styled.InputError>
                    }
                </Styled.InputContainer>
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