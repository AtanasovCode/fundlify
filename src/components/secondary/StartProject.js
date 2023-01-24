import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
    collection,
    updateDoc,
    addDoc,
    doc,
    serverTimestamp,
} from 'firebase/firestore'
import '../../styles/create-project.css';
import arrow from '../../images/icons/arrow-black.png';


const StartProject = ({
    db,
    auth,
    user,
    categorySelected,
    setCategorySelected,
    subCategorySelected,
    setSubCategorySelected,
    setCurrentProjectId,
}) => {

    const navigate = useNavigate();

    const [isCategorySelected, setIsCategorySelected] = useState(false);
    const [isSubCategorySelected, setIsSubCategorySelected] = useState(false);

    const colRef = collection(db, "projects");

    const handleContinue = () => {
        sessionStorage.setItem("createdBy", user.displayName);
        sessionStorage.setItem("category", categorySelected);
        sessionStorage.setItem("subCategory", subCategorySelected);
        navigate("../project-location");
    }


    const returnSelectSubCategory = () => {
        if (categorySelected === "games") {
            return (
                <select
                    className="select-category" id="category"
                    onChange={(e) => {
                        setIsSubCategorySelected(true);
                        setSubCategorySelected(e.currentTarget.value)
                    }}
                    defaultValue=""
                >
                    <option
                        value=""
                        disabled
                    >
                        Select
                    </option>
                    <option value="playing-cards">Playing Cards</option>
                    <option value="tabletop-games">Tabletop Games</option>
                    <option value="puzzles">Puzzles</option>
                    <option value="video-games">Video Games</option>
                    <option value="mobile-games">Mobile Games</option>
                </select>
            );
        } else if (categorySelected === "comics") {
            return (
                <select
                    className="select-category" id="category"
                    onChange={(e) => {
                        setIsSubCategorySelected(true);
                        setSubCategorySelected(e.currentTarget.value)
                    }}
                    defaultValue=""
                >
                    <option
                        value=""
                        disabled
                    >
                        Select
                    </option>
                    <option value="comic-books">Comic Books</option>
                    <option value="graphic-novels">Graphic Novels</option>
                    <option value="webcomics">Webcomics</option>
                    <option value="anthologies">Anthologies</option>
                </select>
            );
        } else if (categorySelected === "photography") {
            return (
                <select
                    className="select-category" id="category"
                    onChange={(e) => {
                        setIsSubCategorySelected(true);
                        setSubCategorySelected(e.currentTarget.value)
                    }}
                    defaultValue=""
                >
                    <option
                        value=""
                        disabled
                    >
                        Select
                    </option>
                    <option value="animals">Animals</option>
                    <option value="nature">Nature</option>
                    <option value="people">People</option>
                    <option value="places">Places</option>
                    <option value="photobooks">Photobooks</option>
                </select>
            );
        } else if (categorySelected === "crafts") {
            return (
                <select
                    className="select-category" id="category"
                    onChange={(e) => {
                        setIsSubCategorySelected(true);
                        setSubCategorySelected(e.currentTarget.value)
                    }}
                    defaultValue=""
                >
                    <option
                        value=""
                        disabled
                    >
                        Select
                    </option>
                    <option value="candles">Candles</option>
                    <option value="diy">DIY</option>
                    <option value="glass">Glass</option>
                    <option value="pottery">Pottery</option>
                    <option value="woodworking">Woodworking</option>
                </select>
            );
        } else if (categorySelected === "art") {
            return (
                <select
                    className="select-category" id="category"
                    onChange={(e) => {
                        setIsSubCategorySelected(true);
                        setSubCategorySelected(e.currentTarget.value)
                    }}
                    defaultValue=""
                >
                    <option
                        value=""
                        disabled
                    >
                        Select
                    </option>
                    <option value="candles">Candles</option>
                    <option value="poster">Posters</option>
                    <option value="diy">DIY</option>
                    <option value="glass">Glass</option>
                    <option value="pottery">Pottery</option>
                    <option value="woodworking">Woodworking</option>
                </select>
            );
        } else if (categorySelected === "technology") {
            return (
                <select
                    className="select-category" id="category"
                    onChange={(e) => {
                        setIsSubCategorySelected(true);
                        setSubCategorySelected(e.currentTarget.value)
                    }}
                    defaultValue=""
                >
                    <option value="candles">Candles</option>
                    <option value="diy">DIY</option>
                    <option value="glass">Glass</option>
                    <option value="pottery">Pottery</option>
                    <option value="woodworking">Woodworking</option>
                </select>
            );
        }
    }

    return (
        <div className="start-project-container">
            <div className="project-start-info-container">
                <div className="project-start-heading">
                    First, let's get you set up.
                </div>
                <div className="project-start-sub">
                    Select a primary category and a subcategory.
                </div>
                <div className="project-start-explanation">
                    Try to select a category that best describes your product.
                    These will help backers find your project more easily.
                </div>
            </div>
            <div className="project-start-category-container">
                <select
                    className="select-category"
                    id="category"
                    onChange={(e) => {
                        setIsCategorySelected(true);
                        setCategorySelected(e.currentTarget.value)
                    }}
                    defaultValue=""
                >
                    <option
                        value=""
                        disabled
                    >
                        Select
                    </option>
                    <option value="comics">Comics</option>
                    <option value="games">Games</option>
                    <option value="photography">Photography</option>
                    <option value="crafts">Crafts</option>
                    <option value="art">Art</option>
                    <option value="technology">Technology</option>
                </select>
                {
                    isCategorySelected ?
                        returnSelectSubCategory()
                        :
                        <div className="sub-category-disabled">Select</div>
                }
            </div>
            <div className="project-start-btn-container-start">
                <div
                    onClick={handleContinue}
                    className={isSubCategorySelected ?
                        "continue-btn-start active"
                        :
                        "continue-btn-start"
                    }
                >
                    <img 
                        src={arrow}
                        style={{"width": "25px", "height": "25px"}}
                    />
                </div>
            </div>
        </div>
    );
}

export default StartProject;