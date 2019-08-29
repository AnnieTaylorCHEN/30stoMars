import React, { useState, Fragment, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Alert from '../layout/Alert'
import Dashboard from './Dashboard'

import { getPost, editPost } from '../../actions/post'

const EditPost = ({ 
    post: { post }, 
    getPost,
    editPost,
    history, 
    match}) => {

    useEffect(()=> {
        getPost(match.post._id)
    }, [getPost, match])
    
    const [ text, setText ] = useState({text: post.text})

    const onSubmit = e => {
        e.preventDefault()
        editPost({text}, history)
        history.push('/echelon/posts')
    }

    return (
        <Fragment>
            <Dashboard />
            <Alert />
            <div className="post-form">
                <h3>Edit your topic</h3>
                <form className="form" onSubmit={onSubmit}>
                    <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Edit your post"
                    value={post.text}
                    onChange={e => setText({text: e.target.value})}
                    required
                    ></textarea>
                    <input type="submit" className="btn" value="OK, post it!" />
                </form>
            </div>
        </Fragment>)
    
}

EditPost.propTypes = {
    editPost: PropTypes.func.isRequired,
    getPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
})

export default connect(mapStateToProps, { editPost, getPost })(withRouter(EditPost))
