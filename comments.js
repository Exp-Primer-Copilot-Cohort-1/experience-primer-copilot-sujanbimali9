// Create web server
// npm install express --save
// npm install body-parser --save
// npm install mongoose --save

// Load packages
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Comments');

// Create instance of express
var app = express();

// Use body-parser
app.use(bodyParser.json());

// Create schema
var CommentSchema = mongoose.Schema({
    name: String,
    comment: String
});

// Create model
var CommentModel = mongoose.model("CommentModel", CommentSchema);

// Create comment
app.post('/api/comment', createComment);

// Retrieve all comments
app.get('/api/comment', findAllComments);

// Retrieve comment by ID
app.get('/api/comment/:id', findCommentById);

// Update comment by ID
app.put('/api/comment/:id', updateComment);

// Delete comment by ID
app.delete('/api/comment/:id', deleteComment);

// Create comment
function createComment(req, res) {
    var comment = req.body;
    CommentModel
        .create(comment)
        .then(
            function (commentObj) {
                res.json(commentObj);
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );
}

// Retrieve all comments
function findAllComments(req, res) {
    CommentModel
        .find()
        .then(
            function (comments) {
                res.json(comments);
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );
}

// Retrieve comment by ID
function findCommentById(req, res) {
    var commentId = req.params.id;
    CommentModel
        .findById(commentId)
        .then(
            function (comment) {
                res.json(comment);
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );
}

// Update comment by ID
function updateComment(req, res) {
    var commentId = req.params.id;
    var comment = req.body;
    CommentModel
        .update(
            {
                _id: commentId
            },
            {
                name: comment.name,
                comment: comment.comment
            }
        )
        .then(
            function (status) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(400).send