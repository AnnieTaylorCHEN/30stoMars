import React, { useState, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Alert from '../layout/Alert'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'


const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '' 
    })
    const { name, email, password, password2 } = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = async e => {
        e.preventDefault()
        if (password !== password2) {
            setAlert('Passwords do not match.', 'danger')
        } else {
            register({ name, email, password })
        }
    }

    //redirect if logged in
    if (isAuthenticated) {
        return <Redirect to="/echelon" />
    }

    return (
        <Fragment>
            <section className="echelon-register">
                <h1 className="echelon-register__title">Join the Echelon</h1>
                 <div className="echelon-register__form">
                    <Alert />
                    <form className="form" onSubmit={onSubmit}>
                        <div className="form-input">
                            <input 
                                type="text" 
                                placeholder="Name" 
                                name="name" 
                                value={name} 
                                onChange={onChange}
                                required 
                                />
                        </div>
                        <div className="form-input">
                            <p className="form-text">This site uses Gravatar so if you want a profile image, use a Gravatar email</p>
                            <input 
                                type="email" 
                                placeholder="Email Address" 
                                name="email" 
                                value={email}
                                onChange={onChange}
                                required 
                                />
                        </div>
                        <div className="form-input">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                minLength="6"
                                value={password}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-input">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="password2"
                                minLength="6"
                                value={password2}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <input 
                        type="submit"  
                        className="btn" 
                        value="Yes, I'm in!" 
                        />
                    </form>
                    <p>
                    Already in Echelon? <Link className="btn" to="/echelon/login">Log in</Link>
                    </p>
                 </div>
            </section>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register)