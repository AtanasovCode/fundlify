import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
    updateDoc,
    collection,
    doc,
} from "firebase/firestore";

const ProjectLocation = ({
    locationSelected,
    setLocationSelected,
    db,
    auth,
    user,
}) => {

    const [isLocationSelected, setIsLocationSelected] = useState(false);
    const [docId, setDocId] = useState("");

    const docRef = doc(db, "projects", sessionStorage.getItem("docId"));


    const navigate = useNavigate();

    const handleContinue = (e) => {
        e.preventDefault();

        updateDoc(docRef, {
            location: locationSelected,
        })
            .then(() => {
                navigate("../project-basics");
            })
    }

    return (
        <div className="project-location-container">
            <div className="project-location-heading">
                Set a location for your project.
            </div>
            <div className="project-location-explanation">
                Pick your country of legal residence
                if you’re raising funds as an individual.
                If you’re raising funds for a business
                or nonprofit, select the country where
                the entity’s tax ID is registered.
            </div>
            <div className="project-location-select-container">
                <select
                    className="select-location"
                    onChange={(e) => {
                        setIsLocationSelected(true)
                        setLocationSelected(e.currentTarget.value)
                    }}
                >
                    <option
                        value="f"
                        disabled
                        selected
                    >
                        Select
                    </option>
                    <option value="usa">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="france">France</option>
                    <option value="germany">Germany</option>
                    <option value="canada">Canada</option>
                    <option value="mexico">Mexico</option>
                    <option value="spain">Spain</option>
                    <option value="greece">Greece</option>
                    <option value="italy">Italy</option>
                </select>
            </div>
            <div className="project-start-btn-container">
                <input
                    className={isLocationSelected ?
                        "continue-btn active"
                        :
                        "continue-btn"
                    }
                    onClick={handleContinue}
                />
            </div>
        </div>
    );
}

export default ProjectLocation;