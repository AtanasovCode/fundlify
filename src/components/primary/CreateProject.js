import { Outlet } from "react-router-dom";
import { useState } from "react";
import Nav from "../secondary/Nav";
import '../../styles/create-project.css';

const CreateProject = ({
    auth,
    userLoggedIn,
    db,
}) => {

    const [grow, setGrow] = useState(true);

    return (
        <div className="create-project-container">
            <Nav 
                grow={grow} 
                userLoggedIn={userLoggedIn}
            />
            <Outlet />
        </div>
    );
}


export default CreateProject;