import React from "react";
import styles from "../CreateNewPost/CreateNewPost.css";
import uploadImage from "../CreateNewPost/image.png";
import submitArrow from "../CreateNewPost/arrow.png";

const CreateNewPost = () => {
  return (
    <>
      <div className="createContainer">
        <div className="title">Create new post</div>
        <div>
          <form>
            <textarea
              className="textField"
              placeholder="What's on your mind?"
            ></textarea>
          </form>
        </div>
        <div className="bottomButtons">
          <div className="uploadImage">
            <img src={uploadImage} alt="Upload Image" style={{width: "8vmax", marginTop: "1vmax",}} />
          </div>
          <div className="submit">
            <img src={submitArrow} alt="Submit" style={{width: "6vmax", marginTop: "3vmax",}} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewPost;
