import { Link } from "react-router-dom";
import './styles/sign-up.css';

const SignUp = () => {
    return (
        <div className="auth-container">
            <div className="auth-nav-container">
                <div className="auth-logo">Fundlify</div>
            </div>
            <div className="auth-form-container">
                <div className="auth-heading">Sign Up</div>
                <input
                    type="text"
                    placeholder="Name"
                    className="auth-input"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="auth-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="auth-input"
                />
                <input
                    type="button"
                    value="Create Account"
                    className="auth-btn"
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