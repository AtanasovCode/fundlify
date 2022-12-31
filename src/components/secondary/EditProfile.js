import { useState, useEffect } from 'react';
import '../../styles/edit-profile.css';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import {
    updateDoc,
    doc,
} from 'firebase/firestore';
import Nav from './Nav';

const EditProfile = ({
    user,
    auth,
    db,
    query,
    where,
    userInfo,
    userLoggedIn,
}) => {

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");



    let navigate = useNavigate();

    useEffect(() => {
        userInfo.forEach((info) => {
            setBio(info.bio);
            console.log(info.bio);
        })
        if(userLoggedIn) {
            setName(user.displayName);
        }
    }, [userInfo])

    const docRef = doc(db, "users", sessionStorage.getItem("updateId"));

    const formatTextForURL = (text) => {
        return text == undefined ? '' : text.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
    }


    const handleUpdateProfile = (e) => {
        e.preventDefault()
        updateProfile(auth.currentUser, {
            displayName: name,
        })
            .then(() => {
                sessionStorage.setItem("username", name);
                updateDoc(docRef, {
                    bio: bio,
                    location: location,
                    username: name,
                })
                    .then(() => {
                        navigate(`/users/${formatTextForURL(sessionStorage.getItem("username"))}`, { replace: true });
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    return (
        <div className="edit-profile-container">
            <Nav sticky={true} grow={true} userLoggedIn={userLoggedIn} />
            <div className="edit-profile-heading">
                Edit Profile
            </div>
            <div className="edit-profile-info">
                <div className="edit-container">
                    <div className="edit-property">Name</div>
                    <input
                        type="text"
                        value={name}
                        name="name"
                        className="edit-profile-input"
                        onChange={(e) => setName(e.currentTarget.value)}

                    />
                    <div className="edit-property-desc">
                        Your name is displayed
                        on your profile
                    </div>
                </div>
                <div className="edit-container">
                    <div className="edit-property">Avatar</div>
                        <input
                            type="file"
                            className="input-file"
                        />
                    <div className="edit-property-desc">
                        JPEG. PNG, WEBP - 5MB Limit
                    </div>
                </div>
                <div className="edit-container">
                    <div className="edit-property">Biograpghy</div>
                    <textarea
                        className="input-bio"
                        maxLength={200}
                        value={bio}
                        onChange={(e) => setBio(e.currentTarget.value)}

                    />
                    <div className="edit-property-desc">
                        We suggest a short bio, anything under 200
                        characters looks best.
                    </div>
                </div>
                <div className="edit-container">
                    <div className="edit-property">
                        Location
                    </div>
                    <input
                        type="text"
                        placeholder="Eg. London, UK"
                        name="location"
                        value={location}
                        className="edit-profile-input"
                        onChange={(e) => setLocation(e.currentTarget.value)}
                    />
                </div>
                <div className="edit-container">
                    <input
                        type="button"
                        value="Update Profile"
                        className="edit-profile-btn"
                        onClick={handleUpdateProfile}
                    />
                </div>
            </div>
        </div>
    );
}

export default EditProfile;