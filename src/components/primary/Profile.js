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
    auth,
    userLoggedIn,
    db,
}) => {

    const [userInfo, setUserInfo] = useState([]);
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

    return (
        <div className="profile-container">
            <Nav
                userLoggedIn={userLoggedIn}
                grow={grow}
            />
            <div className="profile-title-container">
                Profile
            </div>
            <div className="profile-info-container" key={user.userId}>
                <div className="profile-info">
                    <div className="profile-icon-container">
                        <img
                            src={pfp}
                            alt="profile picture"
                            className="pfp"
                        />
                        <Link
                            to="/edit-profile"
                            className="edit-profile"
                        >
                            Edit Profile
                        </Link>
                    </div>
                    <div className="profile-name-container">
                        <div className="profile-display-name">
                            {user.displayName}
                        </div>
                        <div className="profile-location-container">
                            <div className="profile-location">
                                Location
                            </div>
                        </div>
                        <div className="projects-backed-container">
                            Projects Backed 0
                        </div>
                    </div>
                </div>
                <div className="profile-desc">
                    I am a mysterious individual who has not yet 
                    updated their bio.
                </div>
            </div>
            <input
                type="button"
                value="sign out"
                onClick={handleSignOut}
            />
        </div>
    );
}

export default Profile;