import React from "react";
import styles from "../CreateNewPost/CreateNewPost.css";

const CreateNewPost = () => {
  return (
    <>
      <div className="createContainer">
        <div className="title">Create new post</div>
        <div className="textField">
          <input type="textarea" name="textValue" />
        </div>
        <div className="uploadImage"></div>
        <div className="submit"></div>
      </div>
    </>
  );
};

export default CreateNewPost;
