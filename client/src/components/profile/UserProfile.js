import Cookies from "js-cookie";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { BeatLoader } from "react-spinners";

import {
  dataURItoBlob,
  uplaodImages,
  uploadProfilePicture,
} from "../../helpers";
import "./userprofile.css";
import Footer from "../footer/Footer";

function UserProfile() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const img_ref = useRef();
  const [image, setimage] = useState("");
  const [about, setAbout] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (readerEvent) {
        setimage(readerEvent.target.result);
        setError("");
      };
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!image || !about) {
        setError("Add image and tell something about yourself");
        return;
      } else setError("");
      if (about.length > 120) {
        setError("Maximam 80 character is allowed");
        return;
      } else setError("");
      if (image !== "") {
        setLoading(true);
        const path = `${user.name}/profile_image`;
        const img = dataURItoBlob(image);
        let formData = new FormData();
        formData.append("path", path);
        formData.append("file", img);
        const profile_img = await uplaodImages(formData, user.token);
        const data = await uploadProfilePicture(
          profile_img[0].url,
          about,
          user.token
        );
        Cookies.set(
          "user",
          JSON.stringify({
            ...user,
            picture: profile_img[0].url,
            about: data.about,
          })
        );
        dispatch({ type: "UPDATEPICTURE", payload: data });
      }
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="profile_container">
      <Navbar />
      <div className="profile">
        <div className="profile-photo">
          <div className="preview_img">
            <img src={image ? image : user.picture} />
          </div>
        </div>
        <div className="image_button"><button  onClick={() => img_ref.current.click()}>
          Change or add Image
        </button></div>
        <form
          onSubmit={handleSubmit}
          method="post"
          encType="multipart/form-data"
        >
          <input
            ref={img_ref}
            type="file"
            id="photo-upload"
            accept="image/*"
            onChange={handlePhotoChange}
            hidden
          />
          <label htmlFor="about">About Me:</label>
          <textarea
            id="about"
            name="about"
            rows="5"
            value={about ? about : user.about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
          {error && <span>{error}</span>}
          <button disabled={loading}  type="submit">{ loading ? <BeatLoader size={10} /> : 'Save' }</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default UserProfile;
