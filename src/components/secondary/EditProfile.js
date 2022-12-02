import { useState, useEffect } from 'react';
import '../../styles/edit-profile.css';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import {
    updateDoc,
    doc,
} from 'firebase/firestore';

const EditProfile = ({
    user,
    auth,
    db,
    query,
    where,
    userInfo,
    updateId,
}) => {

    const [name, setName] = useState(user.displayName);
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");



    let navigate = useNavigate();

    useEffect(() => {
        userInfo.forEach((info) => {
            setBio(info.bio);
        })
    }, [])

    const docRef = doc(db, "users", updateId);


    const handleUpdateProfile = (e) => {
        e.preventDefault();
        updateProfile(auth.currentUser, {
            displayName: name,
        })
            .then(() => {
                updateDoc(docRef, {
                    bio: bio,
                    location: location,
                    username: name,
                })
                    .then(() => {
                        navigate("../profile", { replace: true });
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
            <div className="edit-profile-heading">
                Settings
            </div>
            <div className="edit-profile-info">
                <div className="edit-name-container">
                    <div>Name</div>
                    <input
                        type="text"
                        value={name}
                        name="name"
                        onChange={(e) => setName(e.currentTarget.value)}

                    />
                    <div>
                        Your name is displayed
                        on your profile
                    </div>
                </div>
                <div className="edit-pfp-container">
                    <div>Avatar</div>
                    <div className="edit-pfp-wrap">
                        <input
                            type="button"
                            value="Chose an image from your computer"
                            className="edit-pfp-btn"
                        />
                        <input
                            type="file"
                            className="input-file"
                        />
                    </div>
                    <div>
                        JPEG. PNG, WEBP - 5MB Limit
                    </div>
                </div>
                <div className="edit-bio-container">
                    <div>Biograpghy</div>
                    <textarea
                        className="input-bio"
                        maxLength={200}
                        value={bio}
                        onChange={(e) => setBio(e.currentTarget.value)}

                    />
                    <div>
                        We suggest a short bio, anything under 200
                        characters looks best.
                    </div>
                </div>
                <div className="edit-location-container">
                    <div>
                        Location
                    </div>
                    <input
                        type="text"
                        placeholder="Eg. London, UK"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.currentTarget.value)}
                    />
                </div>
                <div className="update-profile-container">
                    <input
                        type="button"
                        value="Update Profile"
                        onClick={handleUpdateProfile}
                    />
                </div>
            </div>
        </div>
    );
}

export default EditProfile;