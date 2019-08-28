import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Loader from '../layout/Loader'
import Alert from '../layout/Alert'


const Profile = ({ 
    profile: { profile, loading },
    auth}) => {

    return (
        <Fragment>
        <Alert />
            {profile === null || loading ? (
                <Loader />) : (
                <Fragment>
                    {auth.isAuthenticated &&
                     auth.loading === false &&
                     auth.user._id === profile.user._id && (
                         <Fragment>
                            <div className="profile-grid">
                                <img className="profile__pic" src={profile.user.avatar} alt="user profile pic" />
                                <div className="profile__info">
                                    <p><span className="profile__info--tag">Name</span>: {profile.user.name}</p>
                                    <p><span className="profile__info--tag">Location</span>: {profile.location}</p>
                                    <p><span className="profile__info--tag">Favorite album</span>: {profile.favmarsalbum}</p>
                                    <p><span className="profile__info--tag">Favorite song</span>: {profile.favmarssong}</p>
                                </div>
                                <div className="profile__button">
                                    <Link to="/echelon/edit-profile" className="btn" >Edit Profile</Link>
                                </div>
                            </div>
                         </Fragment>
                     )}
                </Fragment>)}
            
        </Fragment>
    )
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps)(Profile)