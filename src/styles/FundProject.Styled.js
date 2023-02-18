import styled from "styled-components";


export const FullContainer = styled.div`
    padding-top: 100px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.font};
`;

export const Container = styled.div`
    background-color: ${props => props.theme.background};
    display: flex;
    flex-direction: column;
    max-width: 1700px;
`;

export const Heading = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 25px;
`;

export const Title = styled.div`
    font-size: 28px;
    font-weight: 500;
    @media (max-width: 900px) {
        text-align: center;
        margin-bottom: 12px;
    }
`;

export const SubTitle = styled.div`
    text-align: center;
    font-size: 17px;
    color: ${props => props.theme.fontFaded};
`;

export const FundingFAQ = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    padding: 35px 45px;
    @media (max-width: 900px) {
        grid-template-columns: 1fr;
        padding: 35px 20px;
        place-items: center;
    }
`;

export const Funding = styled.div`
    padding-top: 60px;
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    @media (max-width: 900px) {
        align-items: center;
        justify-content: center;
    }
`;

export const PledgeHeading = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 35px;
    @media (max-width: 900px) {
        top: 0;
        left: auto;
    }
`;

export const PledgeTitle = styled.div`
    font-size: 22px;
    font-weight: 600;
`;

export const PledgeSubtitle = styled.div`
    font-weight: 300;
    color: ${props => props.theme.fontFaded};
`;