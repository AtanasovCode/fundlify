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
    padding: 30px 60px;
    margin-top: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ProfileInfo = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;

export const Description = styled.div`
    font-size: 16px;
    font-weight: 200;
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;

export const ProfilePhotoContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ProfilePhoto = styled.img`
    width: 140px;
    height: 140px;
    border-radius: 50%;
`;

export const EditProfile = styled(Link)`
    position: absolute;
    bottom: 0;
    width: 80%;
    height: 22px;
    background-color: dodgerblue;
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
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