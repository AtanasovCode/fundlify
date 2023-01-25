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
import Loading from "../secondary/Loading";
import '../../styles/discover.css';


const Discover = ({
    auth,
    db,
    storage,
    user,
    userLoggedIn,
    setCurrentProjectId,
    formatTextForUrl,
}) => {

    const [grow, setGrow] = useState(true);
    const [projects, setProjects] = useState([]);
    const [filterCategory, setFilterCategory] = useState("all-categories");
    const [projectCount, setProjectCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

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
        if (projects.length !== 0) setIsLoading(false);
    }, [projects])

    useEffect(() => {
        if (projects) {
            let count = 0;
            projects.map(() => {
                count++;
            })
            setProjectCount(count);
        }
    }, [projects])

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

    return (
        <div className="discover-container">
            {isLoading ? <div className="loading-container"><Loading /></div> : <span></span>}
            <Nav grow={grow} sticky={true} userLoggedIn={userLoggedIn} />
            <div className="discover-filter-container">
                <div className="discover-category-filter discover-filter">
                    <div className="discover-filter-text">
                        Show me
                    </div>
                    <div className="discover-input-filter-container">
                        <select
                            className="discover-input-filter"
                            onChange={(e) => {
                                setFilterCategory(e.currentTarget.value)
                            }}
                            defaultValue="all-categories"
                        >
                            <option value="all-categories">
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



