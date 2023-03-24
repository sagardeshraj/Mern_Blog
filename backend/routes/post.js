const express = require("express");
const { newPost,allPost } = require("../controllers/post");
const { authUser } = require('../middleware/auth');

const router = express.Router();

router.post("/post", authUser, newPost);
router.get("/getallpost", allPost);

module.exports = router;
