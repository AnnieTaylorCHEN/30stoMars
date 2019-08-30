import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'

import { addLike, removeLike, editPost, deletePost } from '../../actions/post'

const PostItem = ({
    auth, 
    addLike, 
    removeLike,
    editPost,
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
    showActions, 
    
}) => {
    
    const [liked, toggleLiked ] = useState(false)

    const [editMode, toggleEditMode ] = useState(false)
    const [postContent, setPostContent ] = useState(text)

    const formData = {
        text: postContent
    }
    
    const likeButton = () => {
        toggleLiked(!liked)
        if (!liked) {
            addLike(_id)
        } else {
            removeLike(_id)
        }
    }

    const editPostButton = () => {
        toggleEditMode(!editMode)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        editPost(_id, formData)
        toggleEditMode(!editMode)
    }

    return (
        <div className="post-item">
            <div className="post-item__bio">
                <img src={avatar} alt=""/>
                <h6>{name}</h6>
            </div>
            <div>
                { editMode ? (
                    <Fragment>
                        <form className="form" onSubmit={onSubmit}>
                            <textarea
                            name="text"
                            cols="30"
                            rows="5"
                            placeholder="Edit your post"
                            value={postContent}
                            onChange={e => setPostContent(e.target.value)}
                            className="form--edit"
                            required
                            ></textarea>
                            <input type="submit" className="btn" value="Done!" />
                        </form>
                    </Fragment>
                ):(<p>{text}</p>)}
                <div className="post-item__meta">
                    <p className="post-item__meta-item">
                        <Moment format="YYYY/MM/DD">{date}</Moment>
                    </p>
                    {showActions && (<Fragment>
                        { likes.filter(like => like.user === auth.user._id).length > 0  ? (<div className={ "heart red" } onClick={()=> likeButton()} ></div>) : (<div className={ liked ? "heart is-active": "heart"} onClick={()=> likeButton()}></div>) }
                        
                        <button type="button" onClick={()=> addLike(_id)} className="post-item__meta-item">
                            <span>{likes.length > 0 && (
                            <span className='comment-count'>{likes.length} &#x2665;</span>
                            )}</span>  
                        </button>
                        
                        <Link to={`/echelon/posts/${_id}`} className="post-item__meta-item">
                            View {comments.length > 0 && (
                            <span className='comment-count'>{comments.length}</span>  
                            )} Comments 
                        </Link>

                        {!auth.loading && user === auth.user._id && (
                        <Fragment>
                            <button type="button" onClick={() => editPostButton()} className="post-item__meta-item">
                            Edit
                            </button> 
                            <button type="button" onClick={() => deletePost(_id)} className="post-item__meta-item delete">
                            &times;
                            </button> 
                        </Fragment>
                        )}
                    </Fragment>)}
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
    editPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { addLike, removeLike, editPost, deletePost } )(PostItem)