import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: ${props => props.theme.background};
`;

export const Project = styled.div`
    width: 100%;
    padding: 35px;
    padding-top: 100px;
    color: ${props => props.theme.font};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 45px;
`;

export const Heading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
`;

export const Title = styled.div`
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    @media (max-width: 800px) {
        font-size: 20px;
    }
    @media (max-width: 500px) {
        font-size: 18px;
    }
`;

export const Info = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 800px) {
        flex-direction: column;   
    }
`;

export const ImageContainer = styled.div`
    width: 65vw;
    height: 85vh;
    max-width: 900px;
    max-height: 400px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    position: relative;
    @media (max-width: 800px) {
        width: 85vw;
        max-width: 600px;
        margin-bottom: 45px;
    }
    @media (max-width: 600px) {
        align-items: center;
    }
    @media (max-width: 500px) {
        width: 90vw;
        max-width: 400px;
    }
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const Categories = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: absolute;
    bottom: -35px;
    left: 0;
    @media (max-width: 800px) {
        bottom: 0;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }
`;

export const Category = styled.div`
    margin-right: 15px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    @media (max-width: 800px) {
        margin-right: 0;
        aligm-items: center;
        justify-content: flex-start;
        padding: 10px 0;
        padding-right: 10px;
        margin-bottom: 20px;
        background-color: ${props => props.theme.background};
        height: 35px;
        max-height: 35px;
        overflow: hidden;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }

`;

export const CategoryName = styled.div`
    font-size: 14px;
    color: ${props => props.theme.fontFaded};
    @media (max-width: 600px) {
        font-size: 11px;
        font-weight: 300;
    }
`;

export const CategoryIcon = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 8px;
    @media (max-width: 600px) {
        width: 15px;
        height: 15px;
    }
`;

export const Funding = styled.div`
    width: 35%;
    margin-left: 30px;
    height: 85vh;
    max-height: 400px;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    @media (max-width: 800px) {
        margin-left: 0;
        max-width: 700px;
        width: 90vw;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const ProgressBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    border-radius: 15px;
    background-color: ${props => props.theme.progressBar};
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

export const Progress = styled.div`
    width: ${props => props.progress}%;
    max-width: 100%;
    height: 70%;
    border-top-right-radius: 22px;
    border-bottom-right-radius: 22px;
    background-color: ${props => props.theme.progress};
`;

export const Funds = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 55px;
    padding-top: 15px;
    @media (max-width: 800px) {
        align-items: center;
        justify-content: center;
    }
`;


export const FundingText = styled.div`
    opacity: .9;
    color: ${props => props.theme.fontFaded};
    display: flex;
`;

export const FundingNumber = styled.div`
    font-size: 25px;
    font-weight: 500;
    color: ${props => props.theme.font};
`;

export const FundingMoney = styled(FundingNumber)`
    color: ${props => props.theme.fontMoney};
`;

export const MoneyGoal = styled.div`
    padding: 0 7px;
    color: ${props => props.theme.fontMoney};
`;


export const BackProject = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const Button = styled.div`
    height: 60px;
    width: 100%;
    background-color: ${props => props.theme.fundButton};
    color: ${props => props.theme.font};
    transition: background-color .2s ease-in;
    &:hover {
        background-color: ${props => props.theme.fundButtonHover};
    }
    text-align: center;
    border-radius: 6px;
    border: none;
    font-size: 17px;
    font-weight: 400;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    @media (max-width: 800px) {
        margin: 0 20px;
    }
`;

