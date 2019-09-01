import React, { useState, Fragment }from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import Moment from 'react-moment'

import { editComment, deleteComment } from '../../actions/post'

const CommentItem = ({
    postId, 
    auth,
    editComment,
    deleteComment,
    comment: {
        _id,
        text,
        name,
        avatar,
        user,
        date
    }
}) => {

    const [editMode, toggleEditMode ] = useState(false)
    const [commentContent, setCommentContent ] = useState(text)

    const formData = {
        text: commentContent
    }

    const editCommentButton = () => {
        toggleEditMode(!editMode)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        editComment(postId, _id, formData)
        toggleEditMode(!editMode)
    }


    return (
        <div className="post-item comment-item">
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
                        placeholder="Edit your comment"
                        value={commentContent}
                        onChange={e => setCommentContent(e.target.value)}
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
                    {!auth.loading && user === auth.user._id && (<Fragment>
                        <button type="button" onClick={() => editCommentButton()} className="post-item__meta-item">
                        Edit
                        </button> 
                        <button onClick={() => deleteComment(postId, _id)} type="button" className="post-item__meta-item delete">
                        &times;
                        </button>
                    </Fragment>
                    )}
                </div>
            </div>
        </div>
    )
}

CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    editComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { editComment, deleteComment })(CommentItem)