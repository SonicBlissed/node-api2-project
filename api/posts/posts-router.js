// implement your posts router here
const express = require('express');
const router = express.Router();
const Posts = require('./posts-model');




//endpoints

router.get('/', (req, res)=> {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'error retrieving the posts',
            realErrorr: err.message
        });
    });
});

router.get('/:id', (req, res)=> {
    Posts.findById(req.params.id)
    .then(posts => {
        posts ? res.status(200).json(posts) : res.status(404).json({message: 'Not Found'})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: 'Error retrieving the post'});
    });
});

router.get('/:id/posts', (req, res)=> {
    Posts.findPostComments(req.params.id)
    .then(posts => {
        posts.length > 0 ? res.status(200).json(posts) : res.status(404).json({message: 'Not Found'})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: 'Error retrieving the posts for this ID'});
    });
});

router.post('/', (req, res)=> {
    Posts.add(req.body)
    .then(postData => {
        res.status(201).json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error adding the post'
        });
    });
});

router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
    .then(count => {
        count > 0 ? res.status(200).json({message: `Goodbye post with ID:${req.params.id}`}) : res.status(404).json({message: 'Not Found'})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: 'Error removing the post'});
    });
});

router.put('/:id', (req, res)=> {
    const changes = req.body;
    Posts.update(req.params.id, changes)
    .then(postData => {
        postData ? res.status(200).json(postData) : res.status(404).json({message: 'Not Found'})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: 'Error updating the post'});
    });
});

module.exports = router