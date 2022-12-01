import { useState } from 'react';
import '../../styles/edit-profile.css';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';

const EditProfile = ({
    user,
    auth,
    db,
}) => {

    let navigate = useNavigate();

    const [name, setName] = useState(user.displayName);
    const [bio, setBio] = useState(user.bio);
    const [location, setLocation] = useState(user.location);

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        updateProfile(auth.currentUser, {
            name: name,
            bio: bio,
            location: location
        })
            .then(() => {
                navigate("../profile", {replace: true});
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