import { useEffect, useState } from 'react';
import '../../styles/nav.css';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import pfp from '../../images/icons/pfp.avif';

const Nav = ({
    userLoggedIn,
    auth,
}) => {

    const [navClass, setNavClass] = useState("nav-container");

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setNavClass("nav-container grow");

            if (window.scrollY === 0) {
                setNavClass("nav-container");
            }
        })
    }, [])

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("user signed out");
            })
    }

    return (
        <nav className={navClass}>
            <div className="nav-logo">
                Fundlify
            </div>
            <div className="nav-info">
                <div className="nav-links">
                    Discover
                </div>
                <div className="nav-links">
                    How It Works
                </div>
                {
                    userLoggedIn ?
                        <Link to="/profile" className="profile-icon">
                            <img
                                src={pfp}
                                alt="profile icon"
                                className="user-icon"
                            />
                        </Link>
                        :
                        <Link to="/sign-in">
                            Log In
                        </Link>

                }
            </div>
        </nav>
    );
}

export default Nav;