import { useEffect, useState } from 'react';
import * as Styled from '../../styles/Nav.Styled';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import pfp from '../../images/icons/pfp.avif';
import menu from '../../images/icons/menu.png';

import userIcon from '../../images/icons/user.png';
import questionIcon from '../../images/icons/question.png';
import discoverIcon from '../../images/icons/search.png';
import homeIcon from '../../images/icons/home.png';




const Nav = ({
    userLoggedIn,
    auth,
    grow,
    sticky,
    user,
}) => {

    const [navClass, setNavClass] = useState(grow ? "nav-container grow" : "nav-container");
    const [navResponsive, setNavResponsive] = useState(true);
    const [growNav, setGrowNav] = useState(false);

    const navigate = useNavigate();

    const formatTextForURL = (text) => {
        return text == undefined ? '' : text.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
    }

    const handleResponsiveNav = () => {
        setNavResponsive(!navResponsive);
    }

    useEffect(() => {
        if (grow !== true) {
            window.addEventListener("scroll", () => {
                if ((window.innerWidth > 700 || document.documentElement.clientWidth > 700)) {
                    setGrowNav(true);
                }

                if (window.scrollY === 0) {
                    setGrowNav(false);
                }
            })
        }
        if (sticky) {
            window.addEventListener("scroll", () => {
                setNavResponsive(true);
            })
        }
    }, [])

    return (
        <Styled.Container
            growNav={growNav}
            grow={grow}
            sticky={sticky}
        >
            <Styled.Menu
                src={menu}
                onClick={handleResponsiveNav}
            />
            <Styled.Logo to="/">
                Fundlify
            </Styled.Logo>
            <Styled.NavIcons>
                <Styled.NavIcon
                    src={homeIcon}
                    onClick={() => {
                        navigate("../");
                    }}
                />
                <Styled.NavIcon
                    src={discoverIcon}
                    onClick={() => {
                        navigate("../discover");
                    }}
                />
                <Styled.NavIcon
                    src={questionIcon}
                    onClick={() => {
                        navigate("../how-it-works");
                    }}
                />
                <Styled.NavIcon
                    src={userIcon}
                    onClick={() => {
                        userLoggedIn ?
                            navigate(`../users/${formatTextForURL(sessionStorage.getItem("username"))}`)
                            :
                            navigate("../sign-in");
                    }}
                />
            </Styled.NavIcons>
            <Styled.Links navResponsive={navResponsive}>
                <Styled.NavLink
                    to="/discover"
                >
                    Discover
                </Styled.NavLink>
                <Styled.NavLink to="/how-it-works">
                    How It Works
                </Styled.NavLink>
                {
                    userLoggedIn ?
                        <Styled.Profile to={`/users/${formatTextForURL(sessionStorage.getItem("username"))}`}>
                            <Styled.ProfileIcon
                                src={pfp}
                                alt="profile icon"
                            />
                        </Styled.Profile>
                        :
                        <Styled.NavLink to="/sign-in">
                            Log In
                        </Styled.NavLink>

                }
            </Styled.Links>
        </Styled.Container>
    );
}

export default Nav;