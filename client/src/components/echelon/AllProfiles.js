import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Loader from '../layout/Loader'
import Dashboard from './Dashboard'
import { getProfiles } from '../../actions/profile'

const AllProfiles = ({ getProfiles, 
    profile: { profiles, loading }
}) => {

    useEffect(()=> {
        getProfiles()
    },[getProfiles])

    return (
        <Fragment>
            { loading ? <Loader /> : (<Fragment>
                <Dashboard />
                <Fragment>
                    <h2>The Echelon</h2>
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                            <Fragment key={profile._id}>
                                <div className="profile-grid">
                                    <img className="profile__pic" src={profile.user.avatar} alt="user profile pic" />
                                    <div className="profile__info">
                                        <p><span className="profile__info--tag">Name</span>: {profile.user.name}</p>
                                        <p><span className="profile__info--tag">Location</span>: {profile.location}</p>
                                        <p><span className="profile__info--tag">Favorite album</span>: {profile.favmarsalbum}</p>
                                        <p><span className="profile__info--tag">Favorite song</span>: {profile.favmarssong}</p>
                                    </div>
                                </div>
                            </Fragment>
                        ))
                    ): <h2>No Profiles Found</h2>}
                </Fragment>
            </Fragment>)}
        </Fragment>
    )
}

AllProfiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(AllProfiles)