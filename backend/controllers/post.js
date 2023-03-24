const Post = require("../models/Post");

exports.newPost = async (req, res) => {
  try {
    const newPost = await new Post(req.body).save();
    await newPost.populate("user", "name picture");
    res.json(newPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.allPost = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);

    const skip = (page - 1) * size;

    const total = await Post.countDocuments();
    const posts = await Post.find().skip(skip).limit(size);
    await Promise.all(
      posts.map((post) => post.populate("user", "name picture about"))
    );

    res.send({
      posts,
      total,
      page,
      size,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
