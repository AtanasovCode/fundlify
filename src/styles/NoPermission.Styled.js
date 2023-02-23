import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    display: none;
    user-select: none;
    z-index: -1;
    opacity: 0;
    position: absolute;
    top: -300%;
    overflow: hidden;
    background-color: ${props => props.theme.background};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    ${props => props.showPopUp && `
        display: block;
        opacity: 1;
        user-select: all;
        top: 100px;
        width: 400px;
        z-index: 9;
        position: fixed;
        left: calc(50% - 200px);
        top: 150px;
        transform: all .2s ease;
        @media (max-width: 500px) {
            width: 90%;
            top: 90px;
            left: 5%;
        }
    `}
`;

export const ImageContainer = styled.div`
    width: 100%;
    height: 100px;
    position: relative;
    background: linear-gradient(
        180deg,
        orange, 
        ${props => props.theme.noPermissionBtnHover},
        ${props => props.theme.noPermissionBtn}
    );
    @media (max-width: 500px) {
        height: 80px;
    }
`;


export const Close = styled.img`
    width: 35px;
    height: 35px;
    padding: 10px;
    background-color: ${props => props.theme.background};
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    &:hover {
        background-color: red;
    }
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    @media (max-width: 500px) {
        padding: 10px 20px;
    }
`;

export const Heading = styled.div`
    margin-bottom: 25px;
    @media (max-width: 500px) {
        margin-bottom: 15px;
    }
`;

export const Title = styled.div`
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 25px;
    @media (max-width: 500px) {
        margin-bottom: 15px;
    }
`;

export const Subtitle = styled.div`
    font-size: 15px;
    font-weight: 300;
    color: ${props => props.theme.fadedFont};
    text-align: center;
`;

export const Button = styled.input`
    height: 45px;
    border: none;
    padding: 5px 25px;
    margin-bottom: 10px;
    color: ${props => props.theme.font};
    border-radius: 12px;
    background-color: ${props => props.theme.noPermissionBtn};
    cursor: pointer;
    font-size: 16px;
    &:hover {
        background-color: ${props => props.theme.noPermissionBtnHover};
    }
`;