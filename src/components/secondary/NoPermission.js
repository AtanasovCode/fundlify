import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Styled from '../../styles/NoPermission.Styled';

import graph from '../../images/image/graph1.png';
import '../../styles/no-permission.css';
import close from '../../images/icons/close.png';



const NoPermission = ({
    permissionType,
    showPopUp,
    handleClosePopUp
}) => {

    const navigate = useNavigate();


    const handleGoToProject = () => {
        navigate(`../projects/${sessionStorage.getItem("userId")}`)
    }

    const handleGoToDiscover = () => {
        navigate("../discover");
    }



    return (
        <Styled.Container showPopUp={showPopUp}>
            <Styled.ImageContainer>
                <Styled.Close
                    src={close}
                    alt="close icon"
                    onClick={handleClosePopUp}
                />
            </Styled.ImageContainer>
            <Styled.Info>
                <Styled.Heading>
                    <Styled.Title>
                        {
                            permissionType === "donation" ?
                                "You are allowed only one donation per project"
                                :
                                "You can only have one project at a time"
                        }
                    </Styled.Title>
                    <Styled.Subtitle>
                        {
                            permissionType === "donation" ?
                                <span>
                                    This is to make sure that one person does
                                    not take up all the available rewards by
                                    donation multiple times to the same project
                                </span>
                                :
                                <span>
                                    If you would like to change/edit your current
                                    project, you can do so by deleting the current
                                    one and startin the proccess for creating another
                                    project.
                                </span>
                        }
                    </Styled.Subtitle>
                </Styled.Heading>
                <Styled.Button
                    type="button"
                    value={permissionType === "donation" ? "Explore other projects" : "Go to my project"}
                    onClick={
                        permissionType === "donation" ?
                            handleGoToDiscover
                            :
                            handleGoToProject
                    }
                />
            </Styled.Info>
        </Styled.Container>
    );
}

export default NoPermission;