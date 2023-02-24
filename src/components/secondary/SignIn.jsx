import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Styled from '../../styles/Auth.Styled';
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithRedirect,
    signInWithPopup,
} from 'firebase/auth';

const SignIn = ({
    auth,
    checkMail,
    inputMailError,
    setInputMailError,
    inputPassError,
    setInputPassError,
}) => {

    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    useEffect(() => {
        setInputMailError(false);
        setInputPassError(false);
    }, [])

    const handleSignIn = (e) => {
        e.preventDefault();

        mail === "" || checkMail(mail) === false ? setInputMailError(true) : setInputMailError(false);
        password.length < 6 ? setInputPassError(true) : setInputPassError(false);

        signInWithEmailAndPassword(auth, mail, password)
            .then(() => {
                setMail("");
                setPassword("");
                navigate("../", { replace: true });
            })
            .catch((err) => {
                console.log(err.message);
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
                <Styled.InputContainer>
                    <Styled.Input
                        type="email"
                        placeholder="Email"
                        name="mail"
                        inputMailError={inputMailError}
                        value={mail}
                        onChange={(e) => setMail(e.currentTarget.value)}
                    />
                    {
                        inputMailError &&
                        <Styled.InputError>
                            Please enter a valid e-mail address
                        </Styled.InputError>
                    }
                </Styled.InputContainer>
                <Styled.InputContainer>
                    <Styled.Input
                        type="password"
                        placeholder="Password"
                        name="password"
                        inputPassError={inputPassError}
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                    {
                        inputPassError &&
                        <Styled.InputError>
                            Password must be at lease 6 characters long
                        </Styled.InputError>
                    }
                </Styled.InputContainer>
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