import styled from "styled-components"
import { Link } from "react-router-dom"

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 35px;
    place-content: center;
    padding: 50px 20px 60px 20px;
    position: relative;
    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        padding-left: 10px;
        padding-right: 10px;
    }
`;

export const Heading = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 22px;
`;

export const Project = styled.div`
    cursor: pointer;
    border-radius: 22px;
    overflow: hidden;
    border: 1px solid ${props => props.theme.borderFaded};
    color: ${props => props.theme.font};
    text-decoration: none;
    position: relative;
    transition: all .3s ease-in;
    &:hover {
        z-index: 2;
        transform: scale(1.01);
        border: 1px solid #ffffff80;
        transition: all .3s ease-in;
    }
`;

export const ProjectImage = styled.div`
    height: 100%;
    width: 100%;
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 3/4;
    z-index: 1;
`;

export const Info = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px 15px;
    display: flex;
    z-index: 10;
    background-color: ${props => props.theme.tint};
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    @media (max-width: 700px) {
        padding: 10px;
    }
`;

export const Name = styled.div`
    font-size: 15px;
    font-weight: 400;
    margin-bottom: 25px;
`;

export const MadeBy = styled.div`
    font-size: 15px;
`;

export const Desc = styled.div`
    font-size: 15px;
    font-weight: 400;
    margin-bottom: 35px;
`;

export const FundingInfo = styled.div`
    width: 100%;
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
`;

export const Percent = styled.div`
    font-size: 14px;
    font-weight: 500;
    position: absolute;
    top: -20px;
    right: 0;
`;

export const Number = styled.div`
    color: ${props => props.theme.moneyColor};
    padding-right: 5px;
`;