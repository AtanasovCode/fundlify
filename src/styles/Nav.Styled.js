import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.nav`
    width: 80%;
    height: 60px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.font};
    border-radius: 45px;
    padding: 20px;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 3%;
    z-index: 10;
    transition: all .3s ease-in;
    ${props => props.growNav && `
        height: 80px;
        width: 100%;
        top: 0;
        border-radius: 0;
        transition: all .3s ease-in;
        `
    };
    ${props => props.grow && `
        height: 80px;
        width: 100%;
        top: 0;
        border-radius: 0;
        transition: all .3s ease-in;
        `
    };
    ${props => props.sticky && `
        position: absolute;
        top: 0;
        left: 0;
    `}
    @media (max-width: 700px) {
        width: 100%;
        height: 80px;
        position: fixed;
        border-radius: 0;
        top: 0;
    }
    @media (max-width: 700px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const Menu = styled.img`
    width: 0;
    height: 0;
    opacity: 0;
    position: absolute;
    @media (max-width: 700px) {
        width: 25px;
        height: 25px;
        cursor: pointer;
        opacity: 1;
        right: 35px;
    }
    @media (max-width: 500px) {
        width: 0;
        height: 0;
        opacity: 0;
        position: absolute;
    }
`;

export const Logo = styled(Link)`
    padding-left: 20px;
    font-size: 23px;
    font-weight: 200;
    cursor: pointer;
    color: ${props => props.theme.logoColor};
    text-decoration: none;
    user-select: none;
    &:visited {
        color: ${props => props.theme.logoColor};
    }
`;

export const Links = styled.div`
    padding-right: 20px;    
    display: flex;
    align-items: center;
    justify-content: flex-end;
    @media (max-width: 700px) {
        width: 250px;
        height: 100vh;
        z-index: 7;
        position: absolute;
        top: 80px;
        right: 0;
        background-color: ${props => props.theme.background};
        padding: 0 30px;
        display: flex;
        transform: ${props => props.navResponsive ? `translateX(100%)` : `translateX(0)`};
        transition: all .3s ease-in;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }
    @media (max-width: 500px) {
        width: 0;
        height: 0;
        opacity: 0;
    } 
`;

export const NavLink = styled(Link)`
    cursor: pointer;
    color: ${props => props.theme.font};
    text-decoration: none;
    margin: 0 25px;
    &:hover {
        color: lime;
    }
    @media (max-width: 900px) {
        margin: 0 10px;
        font-size: 15px;
    }
    @media (max-width: 700px) {
        margin-top: 25px;
        font-size: 17px;
        font-weight: 600;
    }
`;

export const NavIcons = styled.div`
    width: 0;
    height: 0;
    opacity: 0;
    position: fixed;
    @media (max-width: 500px) {
        width: 90%;
        height: 65px;
        border: 1px solid #ffffff70;
        border-radius: 10px;
        z-index: 22;
        position: fixed;
        bottom: 20px;
        left: 5%;
        background-color: ${props => props.theme.background};
        padding: 10px 35px;
        opacity: 1;
        display: flex;
        transition: all .3s ease-in;
        align-items: center;
        justify-content: space-between;
    }
`;

export const NavIcon = styled.img`
    width: 25px;
    height: 25px;
    cursor: pointer;
`;


export const Profile = styled(Link)`
    width: 45px;
    height: 45px;
    padding: 0;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    @media (max-width: 700px) {
        margin-top: 25px;
    }
`;

export const ProfileIcon = styled.img`
    width: 100%;
    height: 100%;
`;