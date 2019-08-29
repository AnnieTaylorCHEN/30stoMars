import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Alert from '../layout/Alert'

import { addPost } from '../../actions/post'

const PostForm = ({ addPost }) => {

    const [ text, setText ] = useState('')

    const onSubmit = (e)=> {
        e.preventDefault()
        addPost({text})
        setText('')
    }
    return (
        <Fragment>
            <Alert />
            <div className="post-form">
                <h3>Start a topic</h3>
                <form className="form" onSubmit={onSubmit}>
                    <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Start a discussion..."
                    value={text}
                    onChange={e=> setText(e.target.value)}
                    required
                    ></textarea>
                    <input type="submit" className="btn" value="OK, post it!" />
                </form>
            </div>
        </Fragment>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null, { addPost })(PostForm)