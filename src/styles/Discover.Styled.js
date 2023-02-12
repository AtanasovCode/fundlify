import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    padding-top: 100px;
    background-color: ${props => props.theme.background};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

export const Filters = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px;
    @media (max-width: 800px) {
        padding: 25px;
        flex-direction: column;
    }
`;

export const Filter = styled.div`
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:nth-child(1) {
        margin-right: 25px;
    }
    @media (max-width: 800px) {
        margin-bottom: 35px;
    }
    @media (max-width: 400px) {
        flex-direction: column;
        align-items: flex-start;
        &:nth-child(1) {
        margin-right: 0;
    }
    }
`;

export const FilterName = styled.div`
    color: ${props => props.theme.font};
    padding-right: 10px;
    @media (max-width: 400px) {
        margin-bottom: 10px;
    }
`;

export const Input = styled.select`
    padding: 10px 50px 10px 10px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.font};
    border: 1px solid ${props => props.theme.borderFaded};
    font-size: 17px;
    cursor: pointer;
    @media (max-width: 400px) {
        width: 250px;
    }
`;   