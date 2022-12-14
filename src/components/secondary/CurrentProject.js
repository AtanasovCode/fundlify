import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    collection,
    onSnapshot,
    onSnapshotsInSync,
    query,
    where,
    docs,
} from "firebase/firestore";
import Nav from "./Nav";
import FundProject from "./FundProject";
import '../../styles/current-project.css';
import categoryIcon from '../../images/icons/category.png';
import subCategoryIcon from '../../images/icons/sub-category.png';
import locationIcon from '../../images/icons/location.png';


const CurrentProject = ({
    db,
    user,
    userLoggedIn,
    currentProjectId,
}) => {

    const [currentProject, setCurrentProject] = useState([]);
    const [grow, setGrow] = useState(true);
    const [sticky, setSticky] = useState(true);

    const colRef = collection(db, "projects");

    useEffect(() => {
        const q = query(colRef, where("documentId", "==", `${sessionStorage.getItem("currentProjectId")}`));
        onSnapshot(q, (snapshot) => {
            let project = [];
            snapshot.docs.forEach((doc) => {
                project.push({ ...doc.data(), id: doc.id });
            })
            setCurrentProject(project)
        })
    }, [])

    const formatString = (string) => {
        string = string.replace(/-/g, ' ');
        return string.replace(/\b\w/g, l => l.toUpperCase())
    }

    const formatNumber = (number) => {
        return parseInt(number).toLocaleString('en-US');
    }

    const calculateProgress = (total, raised) => {
        let percent = 0;
        let progress = raised / total;
        if (progress > 0) {
            percent = progress * 100;
        } else {
            percent = 0;
        }
        return parseInt(Math.floor(percent));
    }


    return (
        <div className="current-project-full-container">
            <Nav
                grow={grow}
                sticky={sticky}
                userLoggedIn={userLoggedIn}
                user={user}
            />
            {
                currentProject.map((project) => {
                    return (
                        <div className="current-project-container" key={project.documentId}>
                            <div className="current-project-title-container">
                                <div className="current-project-title">
                                    {project.projectTitle}
                                </div>
                                <div className="current-project-description">
                                    {project.projectDescription}
                                </div>
                            </div>
                            <div className="current-project-info-container">
                                <div className="current-project-image-container">
                                    <img
                                        alt="project image"
                                        src={project.projectImageUrl}
                                        className="current-project-image"
                                    />
                                    <div className="current-project-category-container">
                                        <div className="current-project-category">
                                            <img
                                                src={categoryIcon}
                                                className="category-icon"
                                            />
                                            {formatString(project.category)}
                                        </div>
                                        <div className="current-project-category">
                                            <img
                                                src={subCategoryIcon}
                                                className="category-icon"
                                            />
                                            {formatString(project.subCategory)}
                                        </div>
                                        <div className="current-project-category">
                                            <img
                                                src={locationIcon}
                                                className="category-icon"
                                            />
                                            {formatString(project.location)}
                                        </div>
                                    </div>
                                </div>
                                <div className="current-project-funding-container">
                                    <div className="progress-bar">
                                        <div className="progress" style={{
                                            width: `${calculateProgress(project.fundingGoal, project.moneyBacked)}%`
                                        }}></div>
                                    </div>
                                    <div className="backers-info-container">
                                        <div className="current-project-funds-raised-container">
                                            <div className="current-project-number-bold money">
                                                ${formatNumber(project.moneyBacked)}
                                            </div>
                                            <div className="current-project-text-sub">
                                                out of
                                                <span className="money-goal">${formatNumber(project.fundingGoal)}</span>
                                                goal
                                            </div>
                                        </div>
                                        <div className="current-project-backers-container">
                                            <div className="current-project-number-bold">
                                                {project.backers}
                                            </div>
                                            <div className="current-project-text-sub">
                                                backers
                                            </div>
                                        </div>
                                    </div>
                                    <div className="back-project-btn-container">
                                        <Link
                                            to={`/fund-project/${sessionStorage.getItem("currentProjectId")}`}
                                            className="back-project-btn"
                                        >
                                            Back this project
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default CurrentProject;