import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Loader from '../layout/Loader'
import Dashboard from './Dashboard'
import PostForm from './PostForm'
import PostItem from './PostItem'

import { getPosts } from '../../actions/post'

const Discussion = ({ 
    getPosts, 
    post: { posts, loading }
}) => {

    useEffect(() => {
        getPosts()
    }, [getPosts])

    return loading ? (<Loader />):(<Fragment>
        <Dashboard />
        <PostForm />
        <div className="posts-grid">
            {posts.map(post => (
                <PostItem key={post._id} post={post} />
            ))}
        </div>
    </Fragment>)
}

Discussion.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, { getPosts })(Discussion)