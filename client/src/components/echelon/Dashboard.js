import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { deleteAccount } from '../../actions/profile'
import { logout } from '../../actions/auth'

const Dashboard = ({ 
    deleteAccount,
    logout,
    auth: { user },
}) => {

    return (
        <Fragment>
            <div className="dashboard">
                <h1 className="dashboard__title">Welcome, {user && user.name}</h1>
                <nav className="dashboard__nav">
                    <Link  to="/echelon/users" className="btn">Echelon</Link>
                    <Link to="/echelon/posts" className="btn">Discussion</Link>
                    <button className="btn " onClick={logout}>Logout</button>
                    <button className="btn btn--danger" onCanPlay={deleteAccount}>Delete Account</button>
                </nav>
            </div>
    </Fragment>)
}

Dashboard.propTypes = {
    deleteAccount: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deleteAccount,logout })(Dashboard)
