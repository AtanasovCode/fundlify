import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile, signOut } from 'firebase/auth';
import {
    updateDoc,
    doc,
} from 'firebase/firestore';

import Nav from './Nav';

import * as Styled from '../../styles/EditProfile.Styled';

import exit from '../../images/icons/exit.png';

const EditProfile = ({
    user,
    setUser,
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
        if (userLoggedIn) {
            setName(user.displayName);
        }
    }, [userInfo])

    const docRef = doc(db, "users", sessionStorage.getItem("updateId"));

    const formatTextForURL = (text) => {
        return text == undefined ? '' : text.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
    }

    //Signs the user out
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setUser({});
                navigate("../", { replace: true })
            })
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
        <Styled.Container>
            <Nav sticky={true} grow={true} userLoggedIn={userLoggedIn} />
            <Styled.Heading>
                Edit Profile
            </Styled.Heading>
            <Styled.Info>
                <Styled.Edit>
                    <Styled.EditProperty>
                        Name
                    </Styled.EditProperty>
                    <Styled.Input
                        type="text"
                        value={name}
                        maxLength={35}
                        name="name"
                        onChange={(e) => setName(e.currentTarget.value)}

                    />
                    <Styled.Desc>
                        Your name is displayed
                        on your profile
                    </Styled.Desc>
                </Styled.Edit>
                <Styled.Edit>
                    <Styled.EditProperty>Biograpghy</Styled.EditProperty>
                    <Styled.Bio
                        maxLength={200}
                        value={bio}
                        onChange={(e) => setBio(e.currentTarget.value)}

                    />
                    <Styled.Desc>
                        We suggest a short bio, anything under 200
                        characters looks best.
                    </Styled.Desc>
                </Styled.Edit>
                <Styled.Edit>
                    <Styled.EditProperty>
                        Location
                    </Styled.EditProperty>
                    <Styled.Input
                        type="text"
                        placeholder="Eg. London, UK"
                        name="location"
                        value={location}
                        maxLength35
                        onChange={(e) => setLocation(e.currentTarget.value)}
                    />
                </Styled.Edit>
                <Styled.Edit>
                    <Styled.Button
                        type="button"
                        value="Update Profile"
                        onClick={handleUpdateProfile}
                    />
                </Styled.Edit>
                <Styled.SignOutContainer>
                    <Styled.SignOut
                        onClick={handleSignOut}
                    >
                        <Styled.SignOutIcon
                            src={exit}
                            alt="exit icon"
                        />
                        Sign Out
                    </Styled.SignOut>
                </Styled.SignOutContainer>
            </Styled.Info>
        </Styled.Container>
    );
}

export default EditProfile;