import { useEffect, useState } from 'react';
import './styles/nav.css';
import { Link } from 'react-router-dom';

const Nav = ({}) => {

    const [navClass, setNavClass] = useState("nav-container");

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setNavClass("nav-container grow");

            if (window.scrollY === 0) {
                setNavClass("nav-container");
            }
        })
    }, [])

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
                <Link to="/sign-in">
                    Sign In
                </Link>
            </div>
        </nav>
    );
}

export default Nav;