import axios from "axios";
import "./profileOfOtherUser.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../helpers";
import Navbar from "../Navbar";
import Footer from "../footer/Footer";

function ProfileOfOtherUser() {
  const { userID } = useParams();
  const [otherUser, setOtherUser] = useState({});

  useEffect(() => {
    userData();
  }, []);

  const userData = async () => {
    const data = await getUser(userID);
    setOtherUser(data._doc);
  };

  return (
    <div className="ProfileOfOtherUser">
      <Navbar />
      <div className="user_wrapper">
        <div className="user_image">
            <img
              src={
                otherUser?.picture
                  ? otherUser.picture
                  : "https://res.cloudinary.com/dttyhvsnv/image/upload/v1677430557/default_pic_gxoa10.png"
              }
            />
          <span>{otherUser.name}</span>
        </div>
        <div className="user_about">{otherUser?.about}</div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfileOfOtherUser;
