import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/auth-page.css';
import * as Styled from '../../styles/Auth.Styled';
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
        <Styled.Container>
            <Styled.Logo to="/" >
                Fundlify
            </Styled.Logo>
            <Styled.SignIn>
                <Styled.Heading>Sign In</Styled.Heading>
                <Styled.Input
                    type="email"
                    placeholder="Email"
                    name="mail"
                    value={mail}
                    onChange={(e) => setMail(e.currentTarget.value)}
                />
                <Styled.Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <Styled.Input
                    type="button"
                    value="Sign in"
                    onClick={handleSignIn}
                />
                <Styled.AlternateOption>
                    or
                    <Styled.InputGoogle 
                        onClick={handleSignInWithGoogle}
                        type="button"
                        value="Sign in with Google"
                    />
                </Styled.AlternateOption>
                <Styled.NewUser>
                    New to Fundlify? 
                    <Styled.A to="/sign-up">
                        Sign Up
                    </Styled.A>
                </Styled.NewUser>
            </Styled.SignIn>
        </Styled.Container>
    );
}

export default SignIn;