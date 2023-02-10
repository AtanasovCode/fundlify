import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    padding-top: 50px;
    max-width: 1440px;
    background-color: var(--main-bg);
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Logo = styled(Link)`
    position: absolute;
    top: 0;
    left: 0;
    font-size: 32px;
    font-weight: 100;
    text-decoration: none;
    color: #ffffff;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
`;

export const SignIn = styled.div`
    border: 1px solid #fff;
    width: 80vw;
    max-width: 450px;
    padding: 5px;
    margin: 50px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border: 1px solid rgba(255, 255, 255, .4);
    position: relative;
`;


export const Heading = styled.div`
    font-size: 26px;
    font-weight: 700;
    margin: 40px 0;
`;

export const Input = styled.input`
    height: 50px;
    width: 80%;
    margin-bottom: 30px;
    background-color: transparent;
    color: #fff;
    padding-left: 10px;
    border: 1px solid #ffffff40;
    font-weight: 600;
    ${props => props.type === "button" && `cursor: pointer`};
    &:hover {
        ${props => props.type === "button" && `
            background-color: #ffffff40
        `};
    }
`;

export const AlternateOption = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;

export const InputGoogle = styled(Input)`
    height: 60px;
    background-color: #F7F4F3;
    color: #000;
    margin-top: 35px;
    &:hover {
        background-color: #CCC;
    }
`;

export const Agreement = styled.div`
    width: 90%; 
    font-size: 14px;
    color: darkgray;
    text-align: center;
    margin-bottom: 35px;
`

export const NewUser = styled.div`
    width: 80%;
    text-align: center;
    font-size: 15px;
    font-weight: 300;
`;

export const A = styled(Link)`
    text-decoration: none;
    color: dodgerblue;
    cursor: pointer;
    margin: 0 8px;
`;