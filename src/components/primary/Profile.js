import pfp from '../../images/icons/pfp.avif';
import '../../styles/profile.css';
import Nav from '../secondary/Nav';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    signOut,
} from 'firebase/auth';
import {
    collection,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';

const Profile = ({
    user,
    setUser,
    userInfo,
    auth,
    userLoggedIn,
    db,
    setUpdateId,
}) => {

    const [grow, setGrow] = useState(true);

    let navigate = useNavigate();
    const colRef = collection(db, "users");


    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setUser({});
                navigate("../", { replace: true })
            })
    }

    useEffect(() => {
        userInfo.forEach((info) => {
            sessionStorage.setItem("updateId", info.id)
        })
    }, [])

    const formatTextForURL = (text) => {
        return text == undefined ? '' : text.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
    }

    return (
        <div className="profile-container">
            <Nav
                userLoggedIn={userLoggedIn}
                grow={grow}
            />
            <div className="profile-title-container">
                Profile
            </div>
            {userInfo.map((user) => {
                return (
                    <div className="profile-info-container" key={user.userId}>
                        <div className="profile-info">
                            <div className="profile-icon-container">
                                <img
                                    src={pfp}
                                    alt="profile picture"
                                    className="pfp"
                                />
                                <Link
                                    to={`/edit-profile/${formatTextForURL(sessionStorage.getItem("username"))}`}
                                    className="edit-profile"
                                >
                                    Edit Profile
                                </Link>
                            </div>
                            <div className="profile-name-container">
                                <div className="profile-display-name">
                                    {user.username}
                                </div>
                                <div className="profile-location-container">
                                    <div className="profile-location">
                                        {user.location ? user.location : ""}
                                    </div>
                                </div>
                                <div className="projects-backed-container">
                                    Projects Backed {user.projectsBacked ? user.projectsBacked : 0}
                                </div>
                            </div>
                        </div>
                        <div className="profile-desc">
                            {user.bio}
                        </div>
                    </div>
                );
            })}
            <input
                type="button"
                value="sign out"
                onClick={handleSignOut}
            />
        </div>
    );
}

export default Profile;