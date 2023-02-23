import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.font};
    padding: 25px 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Finished = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 1000px;
    margin-top: 50px;
    padding: 25px 50px;
    @media (max-width: 800px) {
        margin-top: 50px;
        padding: 0 25px;
    }
    @media (max-width: 500px) {
        margin-top: 35px;
        padding: 0 15px;
    }
`;

export const Icon = styled.img`
    width: 150px;
    height: 150px;
    margin-bottom: 40px;
    @media (max-width: 500px) {
        width: 100px;
        height: 100px;
    }
`;

export const Heading = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.div`
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 20px;
`;

export const Subtitle = styled.div`
    font-size: 17px;
    font-weight: 300;
    color: ${props => props.theme.fadedFont};
    margin-bottom: 35px;
    padding: 0 150px;
    @media (max-width: 800px) {
        padding: 0 10px;
    }
    @media (max-width: 500px) {
        padding: 0;
    }
`;

export const Button = styled(Link)`
    width: 250px;
    height: 50px;
    border: none;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    background-color: ${props => props.theme.donationCompleteBtn};
    color: #000;
    text-decoration: none;
    &:hover {
        background-color: ${props => props.theme.donationCompleteBtnHover};
    }
`;