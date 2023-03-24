import React, { useEffect, useState } from "react";
import "./post.css";
import { getAllPost } from "../../../helpers";
import PostCard from "./PostCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { ScaleLoader } from "react-spinners";
import { DotLoader } from "react-spinners";

function Posts() {
  const LIMIT = 6;
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPost] = useState(0);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    x();
  }, []);

  const x = async () => {
    try {
      const data = await getAllPost(activePage, LIMIT);
      setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      setActivePage(activePage + 1);
      setTotalPost(data.total);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={x}
      hasMore={posts.length < totalPosts}
      loader={
        <div className="loader-container">
          <ScaleLoader color="#000" size={8} className="loader" />
        </div>
      }
      endMessage={
        posts.length && (
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            <b>Looks like You have reached to the end!</b>
          </p>
        )
      }
    >
      {!posts.length ? (
        <div className="post_loader">
          <DotLoader />
        </div>
      ) : (
        <div className="posts_container">
          {posts.map((post, i) => {
            return <PostCard post={post} key={i} />;
          })}
        </div>
      )}
    </InfiniteScroll>
  );
}

export default Posts;
