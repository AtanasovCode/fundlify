import styled from "styled-components";

export const Container = styled.div`
    background-color: ${props => props.theme.background};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;

export const Heading = styled.div`
    text-align: center;
    margin-top: 125px;
    font-size: 40px;
    font-weight: 400;
`;

export const Info = styled.div`
    width: 550px;
    position: relative;
    border: 1px solid ${props => props.theme.editProfileBorder};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 45px;
    @media (max-width: 600px) {
        width: auto;
        margin: 25px 25px;
    }
`;

export const Edit = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 40px;
`;

export const EditProperty = styled.div`
    font-size: 22px;
    font-weight: 300;
    margin-bottom: 8px;
`;

export const Input = styled.input`
    height: 45px;
    width: 100%;
    margin: 10px 0;
    border: 1px solid ${props => props.theme.editProfileBorder};
    background-color: ${props => props.theme.background};
    padding-left: 10px;
    color: #fff;
    &:focus {
        outline: none;
    }
`;

export const Bio = styled.textarea`
    margin: 10px 0;
    height: 100px;
    width: 100%;
    padding: 10px;
    border: 1px solid ${props => props.theme.editProfileBorder};
    font-family: inherit;
    color: #fff;
    background-color: transparent;
    resize: none;
    &:focus {
        outline: none;
    }
`;

export const Desc = styled.div`
    font-size: 15px;
    font-weight: 300;
    color: darkgray;
    text-align: left;
`;

export const Button = styled.input`
    height: 55px;
    width: 100%;
    border-radius: 12px;
    text-align: center;
    border: none;
    cursor: pointer;
    font-size: 17px;
    font-weight: 600;
    color: ${props => props.theme.font};
    background-color: ${props => props.theme.howItWorksBtn};
    &:hover {
        background-color: ${props => props.theme.howItWorksBtnHover};
    }
`;

export const SignOutContainer = styled(Edit)`
    align-items: flex-start;
    justify-content: center;
    margin-top: 30px;
`;

export const SignOutIcon = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 10px;
`;

export const SignOut = styled.div`
    border: none;
    background: linear-gradient(
        to right,
        purple,
        mediumvioletred
    );
    color: ${props => props.theme.font};
    font-size: 17px;
    font-weight: 600;
    width: 40%;
    height: 40px;
    cursor: pointer;
    transition: all .3s;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 10px;
    position: absolute;
    bottom: 15px;
`;
