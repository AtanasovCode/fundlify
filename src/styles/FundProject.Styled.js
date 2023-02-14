import styled from "styled-components";
import { Link } from "react-router-dom";

export const FullContainer = styled.div`
    padding-top: 100px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.font};
`;

export const Container = styled.div`
    background-color: ${props => props.theme.background};
    display: flex;
    flex-direction: column;
`;

export const Heading = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.div`
    font-size: 28px;
    font-weight: 500;
`;

export const SubTitle = styled.div`
    text-align: center;
    font-size: 17px;
    color: ${props => props.theme.fontFaded};
`;

export const Funding = styled.div`
    padding: 35px;
    margin-top: 80px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;