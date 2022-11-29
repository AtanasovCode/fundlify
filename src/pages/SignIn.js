import { Link } from 'react-router-dom';
import './styles/auth-page.css';

const SignIn = () => {
    return (
        <div className="auth-container">
            <div className="auth-nav-container">
                <div className="auth-logo">Fundlify</div>
            </div>
            <div className="auth-form-container sign-in-form">
                <div className="auth-heading">Sign In</div>
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
                    value="Sign in"
                    className="auth-btn"
                />
                <div className="other-options-container">
                    or
                    <div className="sign-up-google">
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