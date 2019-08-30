import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addComment } from '../../actions/post'

const CommentForm = ({ 
    postId, 
    addComment 
}) => {

    const [text, setText ] = useState('')

    return (
        <div className="post-form">
            <h3>Leave a comment</h3>
            <form className="form" onSubmit={ e => {
                e.preventDefault()
                addComment(postId, {text})
                setText('')
            }}>
                <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Leave a comment"
                value={text}
                onChange={e=> setText(e.target.value)}
                required
                ></textarea>
                <input type="submit" className="btn" value="Submit" />
            </form>
      </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, { addComment })(CommentForm)