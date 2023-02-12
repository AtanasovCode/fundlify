import styled from "styled-components";

export const Container = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
`;

export const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 24px;
    font-weight: 500;
    padding-left: 30px;
`;

export const Projects = styled.div`
    padding: 40px 60px;
    max-width: 1440px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 35px;
    @media (max-width: 1000px) {
        padding: 40px 30px;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 20px;
    }
    @media (max-width: 700px) {
        padding: 40px 20px;
        grid-template-columns: 1fr;
        grid-gap: 30px;
    }
`;


export const Project = styled.div`
    border: 1px solid #ffffff40;
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    border-radius: 22px;
    overflow: hidden;
`;

export const ProjectImageContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
`;

export const ProjectImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const ProjectInfo = styled.div`
    margin-top: 250px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    z-index: 5;
    background-color: ${props => props.theme.tint};
`;

export const ProjectHeading = styled.div`

`;

export const ProjectName = styled.div`
    font-size: 21px;
    font-weight: 600;
    padding-bottom: 20px;
    @media (max-width: 900px) {
        padding-bottom: 10px;
    }
    @media (max-width: 600px) {
        font-size: 20px;
    }
    @media (max-width: 300px) {
        font-size: 18px;
    }
`;

export const ProjectDesc = styled.div`
    font-size: 15px;
    font-weight: 400;
    padding-bottom: 15px;
`;

export const Percent = styled.div`
    font-size: 15px;
    color: lime;
`;

export const MadeBy = styled.div`
    font-size: 14px;
    color: darkgray;
    padding-bottom: 10px;
`;
