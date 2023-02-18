import styled from "styled-components";

export const Container = styled.div`
    padding-top: 60px;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    @media (max-width: 900px) {
        padding-top: 0;
        margin: 20px 80px;
        align-items: center;
        justify-content: center;
    }
    @media (max-width: 500px) {
        margin: 20px; 
    }
`;

export const Heading = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 17px;
    opacity: .8;
    font-weight: 700;
    padding: 20px 0;
`;

export const Title = styled.div`
    font-size: 17px;
    font-weight: 600;
    margin-left: 20px;
`;

export const ImageContainer = styled.div`
    width: 60px;
    height: 60px;
    background-color: #ffffff20;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Image = styled.img`
    width: 25px;
    height: 25px;
`;

export const Desc = styled.div`
    font-size: 14px;
    font-weight: 300;
    color: ${props => props.theme.fontFaded};
    padding: 15px 0;
`;

export const FAQContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
`;

export const FAQTitle = styled.div`
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 10px;
`;

export const FAQ = styled.div`
    position: relative;
    padding: 4px 0;
    cursor: pointer;
`;

export const Question = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 15px;
    padding-bottom: 7px;
    opacity: .7;
    cursor: pointer;
`;

export const Arrow = styled.img`
    width: 15px;
    height: 15px;
    margin-right: 7px;
    transform: ${props => props.show ? "rotate(90deg)" :  "rotate()"};
    transition: all .5s;
    opacity: .6;
`;

export const Answer = styled.div`
    padding-left: 20px;
    opacity: 0;
    user-select: none;
    height: 0;
    transform: translateY(-500px);
    transition: all .2s ease-in;
    ${props => props.show && `
        opacity: .7;
        height: auto;
        user-select: all;
        transform: translateY(0);
        transition: all .2s ease-in;
    `}
`;