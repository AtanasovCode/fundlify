import styled from "styled-components";

export const Container = styled.div`
    width: 80%;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    padding: 25px;
    border: 1px solid #ffffff40;
    margin: 50px 0;
    @media (max-width: 900px) {
        width: 100%;
    }
`;

export const Title = styled.div`
    font-size: 20px;
    font-weight: 500;
`;

export const Subtitle = styled.div``;

export const Pledge = styled.div`
    margin-top: 20px;
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr;
    place-items: left;
    grid-gap: 25px;
    @media (max-width: 700px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`;

export const Input = styled.input`
    background-color: ${props => props.theme.background};
    border: 1px solid #ffffff80;
    color: ${props => props.theme.font};
    height: 45px;
    padding-left: 25px;
    font-size: 17px;
    font-weight: 400;
    border-radius: 12px;
`;

export const Button = styled.input`
    font-size: 16px;
    font-weight: 400;
    height: 45px;
    text-align: center;
    padding: 5px 10px;
    background-color: lime;
    border: none;
    color: #000;
    cursor: pointer;
    border-radius: 12px;
`;