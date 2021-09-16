import React from 'react'
import styles from '../Profile/Profile.module.css'

const Profile = ({username, walletAddress}) => {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.profilePicture}></div>
                <div className={styles.username}>{username}</div>
                <div className={styles.walletAddress}>{walletAddress}</div>
                <button className={styles.logOutButton}>Log Out</button>

            </div>
        </>
    )
}

export default Profile
