import styled from "styled-components";

export const Container = styled.div`
    background-color: ${props => props.theme.background};
    padding: 70px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

export const Heading = styled.div`
    max-width: 1440px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
`;

export const Title = styled.div`
    font-size: 28px;
    font-weight: 600;
    text-align: center;
    @media (max-width: 500px) {
        font-size: 20px;
    }
    @media (max-width: 375px) {
        font-size: 18px;
    }
`;

export const Creative = styled.span`
    padding: 0 10px;
    font-weight: 600;
    font-size: 38px;
    font-family: 'Dancing Script', cursive;
    color: ${props => props.theme.creative};
`;

export const Subtitle = styled.div`
    font-size: 22px;
    font-weight: 300;
    color: ${props => props.theme.fadedFont};
    margin-top: 20px;
    @media (max-width: 500px) {
        font-size: 17px;
    }
`;

export const Funds = styled.div`
    max-width: 1440px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 30px;
    @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
    }
`;

export const FundStats = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 0;
    &:nth-child(2) {
        padding: 60px 120px;
    }
    @media (max-width: 800px) {
        &:nth-child(2) {
            padding: 60px;
        }
    }
    @media (max-width: 600px) {
        padding: 30px;
    }
`;

export const FundNumber = styled.div`
    font-size: 26px;
`;

export const FundText = styled.div`
    font-size: 18px;
    text-align: center;
`;