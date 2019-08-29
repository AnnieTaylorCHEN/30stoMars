import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'

import { addLike, removeLike, deletePost } from '../../actions/post'

const PostItem = ({
    auth, 
    addLike, 
    removeLike,
    deletePost,
    post : {
        _id,
        text, 
        name, 
        avatar,
        user,
        likes,
        comments,
        date
    },
    showActions
}) => {
    const [liked, toggleLiked ] = useState(false)
    
    const likeButton = () => {
        toggleLiked(!liked)
        if (!liked) {
            addLike(_id)
        } else {
            removeLike(_id)
        }
    }

    return (
        <div className="post-item">
            <div className="post-item__bio">
                <img src={avatar} alt=""/>
                <h6>{name}</h6>
            </div>
            <div>
                <p>{text}</p>
                <div className="post-item__meta">
                    <p className="post-date post-item__meta-item">
                        <Moment format="YYYY/MM/DD">{date}</Moment>
                    </p>
                    {showActions && <Fragment>
                        <div className={ liked ? "heart is-active": "heart"} onClick={()=> likeButton()}></div>
                        
                        <button type="button" onClick={()=> addLike(_id)} className="post-item__meta-item">
                            <span>{likes.length > 0 && (
                            <span className='comment-count'>{likes.length} &#x2665;</span>
                            )}</span>  
                        </button>
                        
                        <Link to={`/posts/${_id}`} className="post-item__meta-item">
                            View {comments.length > 0 && (
                            <span className='comment-count'>{comments.length}</span>  
                            )} Comments 
                        </Link>
                        {!auth.loading && user === auth.user._id && (
                        <Fragment>
                            <Link to="/echelon/edit-post" className="post-item__meta-item">
                            Edit
                            </Link> 
                            <button type="button" onClick={ e=> deletePost(_id)} className="post-item__meta-item delete">
                            &times;
                            </button> 
                        </Fragment>
                        )}
                    </Fragment>}
                </div>
            </div>
        </div>
    )
}

PostItem.defaultProps ={
    showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost } )(PostItem)