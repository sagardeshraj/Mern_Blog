import React from "react";
import {CiBookmark} from 'react-icons/ci';
import { Link, useNavigate } from "react-router-dom";


function PostCard({post}) {
    const utcTimeString = post.createdAt;
    const date = new Date(utcTimeString);
    // const localTimeString = date.toLocaleString();
    const localTimeString = date.toLocaleDateString();

    const navigate = useNavigate()

    const navigateToArticle = ()=>{
      navigate('/article', {state: {post}})
    }
    
  return (
    <div className="item">
      <div className="left">
        <img src={post.image} alt="" />
      </div>
      <div className="right">
        <div className="title">
          <h3 onClick={navigateToArticle}>
            {post.title}
          </h3>
        </div>
        <div className="description">
          {post.description}
        </div>
        <div className="profile_data">
          <div className="user_image">
            <img src={post.user?.picture} alt="" />
          </div>
          <div className="user_middle">
            <span className="user_name"><Link to ={`/ProfileRedirect/${post.user._id}`}>{post.user.name} </Link></span>
            <span className="date">{localTimeString}</span>
          </div>
          <div className="savePost">
            <CiBookmark size={25} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
