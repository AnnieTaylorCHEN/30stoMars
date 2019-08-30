const express = require('express')
const router = express.Router()

const {check, validationResult} = require('express-validator')
const auth = require('../../middleware/auth')

const Post = require('../../models/Post')
const User = require('../../models/User')

//route: POST echelon/posts
//note: create a post
//access: private

router.post('/', auth, [
    check('text', 'Text is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    try {
        //find current user logged in 
        const user = await User.findById(req.user.id).select('-password')
        //create new post
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })
        //save new post
        const post = await newPost.save()
        res.json(post)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})

//route: GET echelon/posts
//note: get all posts
//access: public
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({date: -1})
        res.json(posts)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})

//route: GET echelon/posts/:id
//note: get post by id 
//access: public 
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(400).json({msg: 'Post not found'})
        }
        res.json(post)
    } catch (error) {
        console.error(error.message)
        if (error.kind === 'ObjectId'){
            return res.status(400).json({msg: 'Post not found'})
        }
        res.status(500).send('Server error')
    }
})

//route: PATCH echelon/posts/:id
//note: edit post by id 
//access: private
router.patch('/:id', auth, [
    check('text', 'Text is required.').not().isEmpty()
], async (req, res)=> {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    try {
        let post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(400).json({msg: 'Post not found'})
        }
        //check whether logged in user has right to the post
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not authorized'})
        }
        //check text of the post and save
        post.text = req.body.text
        await post.save()
        const posts = await Post.find().sort({date: -1})
        res.json(posts)
    } catch (error) {
        console.error(error.message)
        if (error.kind === 'ObjectId'){
            return res.status(400).json({msg: 'Post not found'})
        }
        res.status(500).send('Server error')
    }
})

//route: DELETE echelon/posts/:id
//route: delete a post by id 
//access: private
router.delete('/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(400).json({msg: 'Post not found'})
        }
        //check whether logged in user has right to the post
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not authorized'})
        }
        //remove post and send feedback msg
        await post.remove()
        res.json({msg: 'Post removed.'})
    } catch (error) {
        console.error(error.message)
        if (error.kind === 'ObjectId'){
            return res.status(400).json({msg: 'Post not found'})
        }
        res.status(500).send('Server error')
    }
})

//route: PUT echelon/posts/like/:id
//note: like a post
//access: private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        //check if the post has been liked by logged in user already, you can only like it once
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked.'})
        }
        //save user id in the likes array (of objects with like id and user id), save the post
        post.likes.unshift({user: req.user.id})
        await post.save()
        res.json(post.likes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})

//route: PUT echelon/posts/unlike/:id
//route: unlike a post
//access: private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        //check if the post has not been liked by the user yet
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not been liked.'})
        }
        //get the index to remove, get the user, map them to array, find index of the logged user, remove it from likes array
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
        post.likes.splice(removeIndex, 1)
        await post.save()
        res.json(post.likes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})

//route GET echelon/posts/comment/:id
//note: get all the comments to a post
//access: private
router.get('/comment/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.json(post.comments)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})


//route POST echelon/posts/comment/:id
//note: add a comment to a post
//access: private
router.post('/comment/:id',  auth,[
    check('text', 'Text is required.').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const user = await User.findById(req.user.id).select('-password')
        const post = await Post.findById(req.params.id)
        //create new comment
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }
        //add comment to comments array of the post, save the post, return all comments
        post.comments.unshift(newComment)
        await post.save()
        res.json(post.comments)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})

//route: PATCH echelon/posts/comment/:id/:comment_id
//note: edit a comment
//access: private
router.patch('/comment/:id/:comment_id', auth, [
    check('text', 'Text is required.').not().isEmpty()
], async(req, res)=> {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const post = await Post.findById(req.params.id)
        //find comment to this post
        const comment = post.comments.find(comment => comment.id === req.params.comment_id)
        //see if comment exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found.'})
        }
        //check if the logged in user has the right to modify the comment
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized.'})
        }
        comment.text = req.body.text
        await post.save()
        res.json(post.comments)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})

//route: DELETE echelon/posts/comment/:id/:comment_id
//note: delete a comment
//access: private
router.delete('/comment/:id/:comment_id', auth, async(req, res)=> {
    try {
        const post = await Post.findById(req.params.id)
        //pull out comment to the post
        const comment = post.comments.find(comment => comment.id === req.params.comment_id)
        //see if comment exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found.'})
        }
        //check if comment belongs to user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized.'})
        }
        //get remove index
        const removeIndex = post.comments.map(comment => comment.id.toString())
        .indexOf(req.params.comment_id)
        post.comments.splice(removeIndex, 1)
        await post.save()
        res.json(post.comments)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})

module.exports = router