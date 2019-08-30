import React, {Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Loader from '../layout/Loader'
import Alert from '../layout/Alert'
import Dashboard from './Dashboard'
import PostItem from '../echelon/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

import { getPost } from '../../actions/post'

const Post = ({
    getPost,
    post: {
        post,
        loading
    },
    match
}) => {
    useEffect(()=> {
        getPost(match.params.id)
    },[getPost, match])

    return loading || post === null ? <Loader /> : <Fragment>
        <Dashboard />
        <div className="posts-grid">
        <h3 className="mb">You're viewing the comment section of this discussion</h3>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <Alert />
        {post.comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
        </div>
    </Fragment>
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)