import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    max-width: 1700px;
    padding-top: 100px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.font};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-x: hidden;
`;

export const Heading = styled.div`
    height: 40px;
    width: 100%;
    padding-left: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, .2);
    border-top: 1px solid rgba(255, 255, 255, .2);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 22px;
`;

export const Info = styled.div`
    width: 100%;
    padding: 30px;
    margin-top: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 800px) {
        flex-direction: column;
    }
`;

export const ProfileInfo = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-right: 55px;
    @media (max-width: 800px) {
        margin-right: 0;
        margin-bottom: 35px;
    }
    @media (max-width: 550px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 20px;
        margin-bottom: 30px;
    }
`;

export const Description = styled.div`
    font-size: 16px;
    font-weight: 200;
    max-width: 350px;
    @media (max-width: 800px) {
        max-width: 400px;
        text-align: center;
        margin: 0 35px;
    }
    @media (max-width: 550px) {
        max-width: 450px;
        margin: 0 20px;
    }
`;

export const ProfilePhotoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    @media (max-width: 550px) {
        margin-bottom: 25px;
    }
`;

export const ProfilePhoto = styled.img`
    width: 140px;
    height: 140px;
    border-radius: 50%;
    border: 2px solid aqua;
`;

export const EditProfile = styled(Link)`
    position: absolute;
    bottom: -8px;
    height: 22px;
    padding: 10px 20px;
    background-color: aqua;
    color: ${props => props.theme.background};
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
`;

export const ProfileName = styled.div`
    padding-left: 20px;
    font-weight: 200;
    font-size: 15px;
    display: flex;
    flex-direction: column;
`;

export const Name = styled.div`
    font-size: 20px;
    font-weight: 600;
    padding-bottom: 5px;
`;

export const SmallText = styled.div`
    font-size: 14px;
    color: ${props => props.theme.fontFaded};
`;

export const LocationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 10px;
`;

export const Location = styled(SmallText)`
`;

export const LocationIcon = styled.img`
    width: 15px;
    height: 15px;
    margin-right: 7px;
`;

export const BackersContainer = styled(LocationContainer)``;

export const BackersIcon = styled(LocationIcon)``;

export const Backers = styled(SmallText)``;



export const ProjectsBacked = styled.div`
    width: 100%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.background};
`;

export const Filters = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Filter = styled.div`
    font-size: 18px;
    font-weight: 400;
    padding: 10px 20px;
    border-radius: 22px;
    cursor: pointer;
    margin: 0 30px;
    @media (max-width: 500px) {
        margin: 0 15px;
        font-size: 15px;
        padding: 13px;
    }
`;

export const BackedFilter = styled(Filter)`
    background-color: ${props => props.active ? props.theme.filterColorActive : props.theme.filterColor};
    color: ${props => props.active ? props.theme.background : props.theme.font};
`;

export const UserFilter = styled(Filter)`
    background-color: ${props => props.active ? props.theme.filterColorActive : props.theme.filterColor};
    color: ${props => props.active ? props.theme.background : props.theme.font};
`;

export const Projects = styled.div`
    width: 100%;
    margin: 40px 0;
    padding: 10px 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 900px) {
        padding: 10px 20px;
        flex-wrap: wrap;
    }
`;

export const Project = styled.div`
    flex: 33%;
    height: 350px;
    border: 1px solid #ffffff80;
    border-radius: 22px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .3s ease-in;
    margin: 0 15px;
    &:hover {
        transform: scale(1.04);
        border: 1px solid lime;
        transition: all .3s ease-in;
    }
    @media (max-width: 900px) {
        margin-bottom: 15px;
        margin-right: 10px;
        margin-left: 10px;
        flex: 33%;
    }
    @media (max-width: 575px) {
        flex: 100%;
    }
`;

export const ProjectImageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;

export const ProjectImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const ProjectInfo = styled.div`
    z-index: 6;
    background-color: ${props => props.theme.tint};
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    color: #fff;
    padding: 10px;
`;

export const ProjectTitle = styled.div`
    font-size: 18px;
    font-weight: 500;
    padding-bottom: 8px;
    @media (max-width: 900px) {
        font-size: 17px;
    }
    @media (max-width: 500px) {
        font-size: 16px;
    }
`;

export const ProjectFunding = styled.div`
    font-size: 15px;
    font-weight: 300;
`;

export const Money = styled.span`
    color: ${props => props.theme.fontMoney};
`;

export const NoProjects = styled.div`
    flex: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    place-self: center;
    @media (max-width: 500px) {
        font-size: 14px;
        display: flex;
        flex-direction: column;
    }
`;

export const NoProjectsLink = styled(Link)`
    color: dodgerblue;
    padding-left: 7px;
    text-decoration: none;
    cursor: pointer;
    @media (max-width: 500px) {
        padding-left: 5px;
    }
`;

export const LoadingContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 3;
    background-color: var(--main-bg);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Loader = styled.div`
    position: absolute;
    top: 40%;
`;