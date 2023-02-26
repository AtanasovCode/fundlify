import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    width: 100%;
    max-width: 1440px;
    background-color: var(--main-bg);
`;

export const Heading = styled.div`
    padding: 0 30px;
    margin: 100px 0 45px 0;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.div`
    font-size: 28px;
    font-weight: 500;
`;

export const Subtitle = styled.div`
    font-size: 16px;
    font-weight: 300;
    color: darkgray;
    text-align: center;
`;

export const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 80px;
    @media (max-width: 800px) {
        margin: 0 40px;
    }
    @media (max-width: 550px) {
        margin: 0 20px;
    }
`;

export const Image = styled.img`
    width: 100%;
`

export const Info = styled.div`
    padding-top: 60px;
    margin: 0 30px;
    display: grid;
    grid-template-columns: repeat(3, .8fr);
    grid-gap: 50px;
    @media (max-width: 800px) {
        grid-template-columns: repeat(2, 1fr);
        place-items: center;
    }
    @media (max-width: 550px) {
        grid-template-columns: 1fr;
        grid-gap: 40px;
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;

export const ListTitle = styled.div`
    font-size: 18px;
    font-weight: 500;
`;

export const List = styled.ul`
    font-weight: 300;
`;

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px;
    margin: 30px 0;
`;

export const Button = styled.input`
    width: 225px;
    height: 50px;
    background-color: lime;
    color: #111;
    text-align: center;
    border: none;
`;