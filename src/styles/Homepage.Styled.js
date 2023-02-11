import styled from "styled-components";
import { Link } from "react-router-dom";

import navImg from '../images/2.jpg';
import boxImage from "../images/image/graph2.png";

export const Container = styled.div`
    max-width: 1440px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.font};
`;

export const Navigation = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90vh;
`;

export const NavigationImage = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(${navImg});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

export const LoginBox = styled.div`
    max-width: 500px;
    width: 90vw;
    position: fixed;
    top: 125px;
    background-color: ${props => props.theme.background};
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 6;
    @media (max-width: 550px) {
        top: 90px;
    }
`;

export const CloseIcon = styled.img`
    width: 20px;
    height: 20px;
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
    z-index: 6;
    @media (max-width: 550px) {
        background-color: ${props => props.theme.background};
        padding: 10px;
        width: 35px;
        height: 35px;
    }
`;

export const BoxInfo = styled.div`
    padding: 20px;
    width: 65%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 35%;
        opacity: 1;
        height: 100%;
        background-image: url(${boxImage});
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
    @media (max-width: 550px) {
        width: 100%;
        margin-top: 80px;
        &::before {
            width: 100%;
            height: 80px;
            top: 0;
            left: 0;
        }
    }
`;

export const BoxHeading = styled.div`
    padding-top: 20px;
    padding-bottom: 55px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

export const BoxTitle = styled.div`
    font-size: 26px;
    font-weight: 700;
    padding-bottom: 25px;
`;

export const BoxSubtitle = styled.div`
    font-size: 16px;
    font-weight: 300;
    color: darkgray;
`;

export const BoxJoin = styled(Link)`
    width: 60%;
    height: 50px;
    margin: 50px 0;
    display: flex;
    text-decoration: none;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.defaultBtn};
    color: #000;
    font-size: 18px;
    font-weight: 500;
    &:hover {
        background-color: ${props => props.theme.defaultBtnHover};
    }
`;