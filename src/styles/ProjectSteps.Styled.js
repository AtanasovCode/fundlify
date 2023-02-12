import styled from "styled-components";

export const Container = styled.div`
    padding: 70px 40px;
    background-color: ${props => props.theme.stepsBackground};
    color: ${props => props.theme.stepsFontColor};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    @media (max-width: 800px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const Heading = styled.div`
    display: flex;
    margin-right: 250px;
    max-width: 500px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 40px;
    @media (max-width: 800px) {
        justify-content: center;
        align-items: center;
        text-align: center;
        margin-right: 0;
    }
`;

export const Question = styled.div`
    color: ${props => props.theme.stepsFadedFont};
`;

export const Title = styled.div`
    font-size: 40px;
    font-weight: 600;
    @media (max-width: 800px) {
        font-size: 30px;
    }
`;

export const StepsContainer = styled.div`
    width: 100%;
    max-width: 1440px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 35px;
    @media (max-width: 800px) {
        grid-template-columns: 1fr;
        place-items: center;
    }
`;

export const Step = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    @media (max-width: 800px) {
        width: 60%;
        max-width: 400px;
        align-items: center;
    }
    @media (max-width: 800px) {
        width: 90%;
    }
`;

export const Number = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.stepIconBg};
    color: ${props => props.theme.stepsBackground};
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 15px;
`;

export const StepDescription = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    @media (max-width: 800px) {
        align-items: center;
    }
`;

export const StepTitle = styled.div`
    font-size: 22px;
    font-weight: 700;
    @media(max-width: 800px) {
        text-align: center;
    }
`;

export const stepSubtitle = styled.div`
    font-size: 16px;
    @media(max-width: 800px) {
        text-align: center;
    }
`;