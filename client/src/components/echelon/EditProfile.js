import React, { useState, Fragment, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { createProfile, getCurrentProfile } from '../../actions/profile'

const EditProfile = ({ 
    profile: { profile, loading }, 
    createProfile, 
    getCurrentProfile, 
    history }) => {
    
    useEffect(()=> {
        getCurrentProfile()
    }, [getCurrentProfile])

    const [formData, setFormData] = useState({
        name: profile.user.name,
        location: profile.location,
        favmarsalbum: profile.favmarsalbum,
        favmarssong: profile.favmarssong
    })
    
    const {
        name,
        location, 
        favmarsalbum,
        favmarssong
    } = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        createProfile(formData, history, true)
        history.push('/echelon')
    }

    return (
        <Fragment>
            <div className="profile__form">
                <h1>Edit Your Profile</h1>
                <form className="form" onSubmit={onSubmit}>
                    <div className="form-input">
                        <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
                    </div>
                    <div className="form-input">
                        <input type="text" placeholder="Location" name="location" value={location} onChange={onChange}/>
                    </div>
                    <div className="form-input">
                        <input type="text" placeholder="Your fav album" name="favmarsalbum" value={favmarsalbum} onChange={onChange}/>
                    </div>
                    <div className="form-input">
                        <input type="text" placeholder="Your fav song" name="favmarssong" value={favmarssong} onChange={onChange}/>
                    </div>
                    
                    <input type="submit" className="btn" value="Done!"/>
                </form>
            </div>
        </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile))
