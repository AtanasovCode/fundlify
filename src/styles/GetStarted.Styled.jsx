import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    max-width: 1440px;
    padding: 0 55px 55px 55px;
    margin: 70px 0;
    @media (max-width: 750px) {
        flex-direction: column-reverse;
    }
`;

export const ImageContainer = styled.div`
    max-width: 450px;
    @media (max-width: 750px) {
        margin-bottom: 35px;
    }
`;

export const Image = styled.img`
    width: 100%;
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 50px;
    max-width: 500px;
    @media (max-width: 800px) {
        margin-right: 30px;
    }
    @media (max-width: 750px) {
        margin-right: 0;
        align-items: center;
        justify-content: center;
    }
`;

export const Title = styled.div`
    font-size: 24px;
    font-weight: 600;
    @media (max-width: 750px) {
        text-align: center;
    }
    @media (max-width: 600px) {
        font-size: 20px;
        font-weight: 500;
    }
`;

export const Buttons = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 35px;
    @media (max-width: 500px) {
        flex-direction: column;
    }
`;

export const Button = styled(Link)`
    padding: 5px 35px;
    min-width: 170px;
    height: 50px;
    border: none;
    border-radius: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #fff;
    background-color: ${props => props.theme.getStartedBtn};
    &:hover {
        background-color: ${props => props.theme.getStartedBtnHover};
    }
    @media (max-width: 500px) {
        margin-bottom: 20px;
        min-width: 250px;
    }
`;

export const HIWBtn = styled(Button)`
    background-color: ${props => props.theme.howItWorksBtn};
    margin-left: 15px;
    &:hover {
        background-color: ${props => props.theme.howItWorksBtnHover};
    }
`;