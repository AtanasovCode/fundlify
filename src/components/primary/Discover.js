import { useState, useEffect } from "react";
import {
    onSnapshot,
    collection,
    query,
    orderBy,
    where,
} from 'firebase/firestore'
import { v4 } from "uuid";
import Nav from "../secondary/Nav";
import '../../styles/discover.css';

const Discover = ({
    auth,
    db,
    storage,
    user,
    userLoggedIn,
}) => {

    const [grow, setGrow] = useState(true);
    const [projects, setProjects] = useState([]);
    const [filterCategory, setFilterCategory] = useState("null");
    const [filterBy, setFilterBy] = useState("oldest");


    const colRef = collection(db, "projects");

    const getFilterName = () => {
        if (filterBy === "newest" || filterBy === "oldest") {
            return `"createdAt"`;
        }
        if (filterBy === "most-funded") {
            return `"moneyBacked"`;
        }
        if (filterBy === "most-backers") {
            return `"backers"`;
        }
    }

    const getFilterOption = () => {
        if (filterBy === "newest") {
            return `"asc"`;
        }
        else {
            return `"desc"`
        }
    }

    useEffect(() => {
        onSnapshot(colRef, (snapshot) => {
            let project = [];
            snapshot.docs.forEach((doc) => {
                project.push({ ...doc.data(), id: doc.id });
            })
            setProjects(project)
        })
    }, [])



    return (
        <div className="discover-container">
            <Nav grow={grow} />
            <div className="discover-filter-container">
                <div className="discover-category-filter discover-filter">
                    <div className="discover-filter-text">
                        Show me
                    </div>
                    <div className="discover-input-filter-container">
                        <select
                            className="discover-input-filter"
                            onChange={(e) => setFilterCategory(e.currentTarget.value)}
                            defaultValue="null"
                        >
                            <option value="null">
                                All Categories
                            </option>
                            <option value="comics">Comics</option>
                            <option value="games">Games</option>
                            <option value="photography">Photography</option>
                            <option value="crafts">Crafts</option>
                            <option value="art">Art</option>
                            <option value="technology">Technology</option>
                        </select>
                    </div>
                </div>
                <div className="discover-projects-filter discover-filter">
                    <div className="discover-filter-text">
                        sorted by
                    </div>
                    <div className="discover-input-filter-container">
                        <select
                            className="discover-input-filter"
                            defaultValue="newest"
                            onChange={(e) => {
                                if (e.currentTarget.value === "newest") {
                                    const q = query(colRef, orderBy("createdAt", "desc"));
                                    onSnapshot(q, (snapshot) => {
                                        let project = [];
                                        snapshot.docs.forEach((doc) => {
                                            project.push({ ...doc.data(), id: doc.id });
                                        })
                                        setProjects(project)
                                    })
                                }
                                if (e.currentTarget.value === "oldest") {
                                    const q = query(colRef, orderBy("createdAt", "asc"));
                                    onSnapshot(q, (snapshot) => {
                                        let project = [];
                                        snapshot.docs.forEach((doc) => {
                                            project.push({ ...doc.data(), id: doc.id });
                                        })
                                        setProjects(project)
                                    })
                                }
                                if (e.currentTarget.value === "most-funded") {
                                    const q = query(colRef, orderBy("moneyBacked", "desc"));
                                    onSnapshot(q, (snapshot) => {
                                        let project = [];
                                        snapshot.docs.forEach((doc) => {
                                            project.push({ ...doc.data(), id: doc.id });
                                        })
                                        setProjects(project)
                                    })
                                }
                                if (e.currentTarget.value === "most-backers") {
                                    const q = query(colRef, orderBy("backers", "asc"));
                                    onSnapshot(q, (snapshot) => {
                                        let project = [];
                                        snapshot.docs.forEach((doc) => {
                                            project.push({ ...doc.data(), id: doc.id });
                                        })
                                        setProjects(project)
                                    })
                                }
                            }}
                        >
                            <option value="newest">
                                Newest
                            </option>
                            <option value="oldest">
                                Oldest
                            </option>
                            <option value="most-funded">
                                Most Funded
                            </option>
                            <option value="most-backers">
                                Most Backers
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="discover-projects-container">
                <div className="displayed-projects-heading">
                    Explore 1 projects
                </div>
                {
                    filterCategory === "null" ?
                        projects.map((project) => {
                            return (
                                <div className="displayed-project-container" key={project.id}>
                                    <div className="displayed-project-image">
                                        <img
                                            src={project.projectImageUrl}
                                            className="displayed-image"
                                        />
                                    </div>
                                    <div className="displayed-project-info">
                                        <div className="displayed-project-name">
                                            {project.projectTitle}
                                        </div>
                                        <div className="displayed-project-desc">
                                            {project.projectDescription}
                                        </div>
                                        <div className="displayed-project-by">
                                            By: {project.createdBy}
                                        </div>
                                        <div className="displayed-project-funded">
                                            {project.moneyBacked} pledges
                                        </div>
                                        <div className="displayed-project-category">
                                            {project.subCategory}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                        :
                        projects.map((project) => {
                            if (project.category === filterCategory) {
                                return (
                                    <div className="displayed-project-container" key={project.id}>
                                        <div className="displayed-project-image">
                                            <img
                                                src={project.projectImageUrl}
                                                className="displayed-image"
                                            />
                                        </div>
                                        <div className="displayed-project-info">
                                            <div className="displayed-project-name">
                                                {project.projectTitle}
                                            </div>
                                            <div className="displayed-project-desc">
                                                {project.projectDescription}
                                            </div>
                                            <div className="displayed-project-by">
                                                By: {project.createdBy}
                                            </div>
                                            <div className="displayed-project-funded">
                                                {project.moneyBacked} pledges
                                            </div>
                                            <div className="displayed-project-category">
                                                {project.subCategory}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })
                }
            </div>
        </div>
    );

}


export default Discover;



