import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    onSnapshot,
    collection,
    query,
    orderBy,
    where,
} from 'firebase/firestore'
import DisplayProject from "../secondary/DisplayProject";
import Nav from "../secondary/Nav";
import '../../styles/discover.css';

const Discover = ({
    auth,
    db,
    storage,
    user,
    userLoggedIn,
    setCurrentProjectId,
}) => {

    const [grow, setGrow] = useState(true);
    const [projects, setProjects] = useState([]);
    const [filterCategory, setFilterCategory] = useState("all-categories");
    const [projectCount, setProjectCount] = useState(0);

    const colRef = collection(db, "projects");
    const q = query(colRef, orderBy("moneyBacked", "desc"));

    useEffect(() => {
        onSnapshot(q, (snapshot) => {
            let project = [];
            snapshot.docs.forEach((doc) => {
                project.push({ ...doc.data(), id: doc.id });
            })
            setProjects(project)
        })
    }, [])

    useEffect(() => {
        if (projects) {
            let count = 0;
            projects.map(() => {
                count++;
            })
            setProjectCount(count);
        }
    })

    useEffect(() => {
        if (filterCategory === "all-categories") return;

        const q = query(colRef, where("category", "==", filterCategory));
        onSnapshot(q, (snapshot) => {
            let project = [];
            snapshot.docs.forEach((doc) => {
                project.push({ ...doc.data(), id: doc.id });
            })
            setProjects(project)
        })
    }, [])

    const formatNumber = (number) => {
        return parseInt(number).toLocaleString('en-US');
    }

    const formatTextForURL = (text) => {
        return text == undefined ? '' : text.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
    }

    return (
        <div className="discover-container">
            <Nav grow={grow} sticky={true} />
            <div className="discover-filter-container">
                <div className="discover-category-filter discover-filter">
                    <div className="discover-filter-text">
                        Show me
                    </div>
                    <div className="discover-input-filter-container">
                        <select
                            className="discover-input-filter"
                            onChange={(e) => setFilterCategory(e.currentTarget.value)}
                            defaultValue="all-categories"
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
                            defaultValue="most-funded"
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
                                    const q = query(colRef, orderBy("backers", "desc"));
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
            <DisplayProject
                projects={projects}
                projectCount={projectCount}
                category={filterCategory}
                formatNumber={formatNumber}
            />
        </div>
    );

}


export default Discover;



