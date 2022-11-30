import pfp from '../../images/icons/pfp.avif';
import '../../styles/profile.css';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const Profile = ({
    user,
    auth,
}) => {

    let navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate("../", {replace: true})
            })
    }

    return (
        <div className="profile-container">
            <div className="profile-info-container">
                <img 
                    src={pfp}
                    alt="profile picture"
                    className="pfp"
                />
                <h1>
                    {user.displayName}
                </h1>
                <input 
                    type="button"
                    className="sign-out-btn"
                    value="Sign Out"
                    onClick={handleSignOut}
                />
            </div>
        </div>
    );
}

export default Profile;