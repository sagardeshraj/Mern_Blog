import React from "react";
import dompurify from "dompurify";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";

function Article({ post }) {
  const utcTimeString = post.createdAt;
  const date = new Date(utcTimeString);
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const cleanHtml = dompurify.sanitize(post.content, { FORCE_BODY: true });
  return (
    <div className="article_wrapper">
      <div className="article">
        <div className="user_info">
          <div className="user_image">
            <img src={post.user.picture} alt="" />
          </div>
          <div className="user_side">
            <span>
              <Link to={`/ProfileRedirect/${post.user._id}`}>
                {post.user.name}
              </Link>
            </span>
            <span>"{post.user.about ? post.user.about : ""}"</span>
          </div>
        </div>
        <div className="article_title">{post.title}</div>
        <span className="post_date">
          {formattedDate} ({post.category}){" "}
        </span>
        <br />
        <div className="article_image">
          <img src={post.image} alt="post image" />
        </div>
        <div
          className="article_content"
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        ></div>
      </div>
      <Footer />
    </div>
  );
}

export default Article;
