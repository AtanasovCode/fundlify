import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as Styled from '../../styles/Discover.Styled';
import {
    onSnapshot,
    collection,
    query,
    orderBy,
    where,
} from 'firebase/firestore'
import DisplayProject from "../secondary/DisplayProject.js";
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
        <Styled.Container>
            {isLoading ? <div className="loading-container"><Loading /></div> : <span></span>}
            <Nav grow={true} sticky={true} userLoggedIn={userLoggedIn} />
            <Styled.Filters>
                <Styled.Filter>
                    <Styled.FilterName>
                        Show me
                    </Styled.FilterName>
                    <Styled.Input
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
                    </Styled.Input>
                </Styled.Filter>
                <Styled.Filter>
                    <Styled.FilterName>
                        sorted by
                    </Styled.FilterName>
                    <Styled.Input
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
                    </Styled.Input>
                </Styled.Filter>
            </Styled.Filters>
            <DisplayProject
                projects={projects}
                projectCount={projectCount}
                category={filterCategory}
                formatNumber={formatNumber}
            />
        </Styled.Container>
    );

}


export default Discover;



