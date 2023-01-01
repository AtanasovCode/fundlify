import { useEffect, useState } from 'react';
import '../../styles/nav.css';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import pfp from '../../images/icons/pfp.avif';
import menu from '../../images/icons/menu.png';

const Nav = ({
    userLoggedIn,
    auth,
    grow,
    sticky,
    user,
}) => {

    const [navClass, setNavClass] = useState(grow ? "nav-container grow" : "nav-container");
    const [navResponsive, setNavResponsive] = useState(false);

    const formatTextForURL = (text) => {
        return text == undefined ? '' : text.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
    }

    const handleResponsiveNav = () => {
        setNavResponsive(!navResponsive);
    }

    useEffect(() => {
        if (grow !== true) {
            window.addEventListener("scroll", () => {
                if ((window.innerWidth > 800 || document.documentElement.clientWidth > 800)) {
                    setNavClass("nav-container grow")
                }

                if (window.scrollY === 0) {
                    setNavClass("nav-container")
                }
            })
        }
        if (sticky) {
            setNavClass("nav-container not-sticky");
            window.addEventListener("scroll", () => {
                setNavResponsive(false);
            })
        }
    }, [])

    return (
        <nav className={navClass}>
            <img
                src={menu}
                className="menu-icon"
                onClick={handleResponsiveNav}
            />
            <Link className="nav-logo" to="/">
                Fundlify
            </Link>
            <div className={navResponsive ? "nav-info show" : "nav-info"}>
                <Link
                    to="/discover"
                    className="nav-links"
                >
                    Discover
                </Link>
                <Link to="/how-it-works" className="nav-links">
                    How It Works
                </Link>
                {
                    userLoggedIn ?
                        <Link to={`/users/${formatTextForURL(sessionStorage.getItem("username"))}`} className="profile-icon">
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