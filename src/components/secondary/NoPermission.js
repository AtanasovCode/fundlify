import graph from '../../images/image/graph1.png';
import '../../styles/no-permission.css';
import close from '../../images/icons/close.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


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
        <div className={showPopUp ? "no-permission-container show" : "no-permission-container"}>
            <div className="no-permission-img-container">
                <img 
                    src={close}
                    alt="close icon"
                    className="permission-close-icon"
                    onClick={handleClosePopUp}
                />
                <img
                    src={graph}
                    alt="graphic art"
                    className="permission-img"
                />
            </div>
            <div className="no-permission-info-container">
                <div className="permission-heading-container">
                    <div className="permission-title">
                        {
                            permissionType === "donation" ?
                                "You are allowed only one donation per project"
                                :
                                "You can only have one project at a time"
                        }
                    </div>
                    <div className="permission-subtitle">
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
                    </div>
                </div>
                <div className="permission-btn-container">
                    <input
                        type="button"
                        className="permission-btn"
                        value={permissionType === "donation" ? "Explore other projects" : "Go to my project"}
                        onClick={
                            permissionType === "donation" ?
                            handleGoToDiscover
                            :
                            handleGoToProject
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default NoPermission;