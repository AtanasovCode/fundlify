import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    doc,
    updateDoc,
} from 'firebase/firestore';
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from 'firebase/storage'
import { v4 } from "uuid";
import '../../styles/project-basics.css';


const ProjectBasics = ({
    db,
    auth,
    storage,
    user,
    projectTitle,
    setProjectTitle,
    projectDescription,
    setProjectDescription,
    fundingGoal,
    setFundingGoal,
}) => {

    const [isTitle, setIsTitle] = useState(false);
    const [isDesc, setIsDesc] = useState(false);
    const [isGoal, setIsGoal] = useState(false);

    const [projectImage, setProjectImage] = useState("");

    const docRef = doc(db, "projects", sessionStorage.getItem("docId"));
    const navigate = useNavigate();
    const imageBucketRef = ref(storage, "/projectImages");

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const getBtnClass = () => {
        if (isTitle && isDesc && isGoal) {
            return "continue-btn active"
        }
        else {
            return "continue-btn"
        }
    }


    const handleContinue = () => {
        const imageRef = ref(storage, `projectPictures/${projectImage + v4()}`)
        uploadBytes(imageRef, projectImage)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then((url) => {
                        updateDoc(docRef, {
                            projectTitle: projectTitle,
                            projectDescription: projectDescription,
                            fundingGoal: fundingGoal,
                            projectImageUrl: url
                        })
                            .then(() => {
                                navigate("../project-rewards");
                            })
                    })
            })
    }



    return (
        <div className="project-basics-container">
            <div className="project-basics-heading">
                <div className="project-basics-title">
                    Start with the basics
                </div>
                <div className="project-basics-subtitle">
                    Make it easy for the people to learn
                    about your project
                </div>
            </div>

            <div className="project-basics-details">
                <div className="project-set-info-container">
                    <div className="project-info">
                        <div className="project-info-title">
                            Project Title
                        </div>
                        <div className="project-info-subtitle">
                            Write a clear, brief title to help people
                            quickly identify your project.
                            It will appear on your project and pre-launch page.
                        </div>
                    </div>
                    <div className="project-input-container">
                        <label htmlFor="title" className="project-info-heading">
                            Title
                        </label>
                        <input
                            type="text"
                            placeholder="The Community Microscope Kit"
                            maxLength={50}
                            className="project-info-input"
                            value={projectTitle}
                            onChange={(e) => {
                                setIsTitle(true);
                                setProjectTitle(e.currentTarget.value)
                            }}
                        />
                    </div>
                </div>

                <div className="project-set-info-container">
                    <div className="project-info">
                        <div className="project-info-title">
                            Project Description
                        </div>
                        <div className="project-info-subtitle">
                            Write a clear, brief description to help people
                            quickly understand your project.
                            It will appear on your project and pre-launch page.
                        </div>
                    </div>
                    <div className="project-input-container">
                        <label htmlFor="title" className="project-info-heading">
                            Description
                        </label>
                        <textarea
                            placeholder="Explore the invisible microscopic world around you with an affordable microscope kit you construct yourself"
                            className="project-info-input"
                            id="project-desc"
                            maxLength={200}
                            value={projectDescription}
                            onChange={(e) => {
                                setIsDesc(true);
                                setProjectDescription(e.currentTarget.value)
                            }}
                        />
                    </div>
                </div>

                <div className="project-set-info-container">
                    <div className="project-info">
                        <div className="project-info-title">
                            Project Image
                        </div>
                        <div className="project-info-subtitle">
                            Add an image that clearly represents your project.
                            Chose one that looks good at different sizes - It'll
                            appear on your project page, across Fundlify and
                            (when shared) on social networks.
                        </div>
                    </div>
                    <div className="project-input-container">
                        <label htmlFor="image" className="project-info-heading">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            className="project-image-upload"
                            onChange={(e) => {
                                setProjectImage(e.currentTarget.files[0]);
                            }}
                        />
                    </div>
                </div>

                <div className="project-set-info-container">
                    <div className="project-info">
                        <div className="project-info-title">
                            Funding Goal
                        </div>
                        <div className="project-info-subtitle">
                            <div>
                                Set a achievable funding goal
                                that covers what you need to
                                complete your project.
                            </div>
                            <div>
                                Funding is all-or-nothing.
                                If you don't meet your goal,
                                you won't recieve any money.
                            </div>
                        </div>
                    </div>
                    <div className="project-input-container">
                        <label htmlFor="title" className="project-info-heading">
                            Goal Amount
                        </label>
                        <input
                            type="text"
                            placeholder="$0"
                            className="project-info-input"
                            value={fundingGoal}
                            onChange={(e) => {
                                setIsGoal(true);
                                setFundingGoal(e.currentTarget.value)
                            }}
                        />
                    </div>
                </div>
                <div className="project-start-btn-container">
                    <div className="btn-info">
                        {
                            isTitle ?
                                isDesc ?
                                    isGoal ?
                                        "Continue"
                                        :
                                        "Fill inputs to continue"
                                    :
                                    "Fill inputs to continue"
                                :
                                "Fill inputs to continue"
                        }
                    </div>
                    <input
                        onClick={handleContinue}
                        className={
                            isTitle ?
                                isDesc ?
                                    isGoal ?
                                        "continue-btn active"
                                        :
                                        "continue-btn"
                                    :
                                    "continue-btn"
                                :
                                "continue-btn"
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default ProjectBasics;




