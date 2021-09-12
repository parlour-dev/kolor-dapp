import React from "react";
import styles from "../CreateNewPost/CreateNewPost.css";
import uploadImage from "../CreateNewPost/image.png";
import submitArrow from "../CreateNewPost/arrow.png";
import PostImage from "../PostImage/PostImage";

import { useHistory } from "react-router-dom";


const CreateNewPost = ({inputText, setInputText, posts, setPosts}) => {
  

  posts=[];
  
  let history = useHistory();
  

  const inputTextHandler = (e) => {
    console.log(e.target.value);
    setInputText(e.target.value);
  };

  const submitPostHandler = (e) => {
    e.preventDefault();
    setPosts([   ...posts, {text: inputText, wallet: "creatorWallet", nick: "creatorNick", id: Math.random()*1000}]);
  

    console.log(posts);
    setInputText('');
    history.goBack();
  };

  return (
    <>
      <div className="createContainer">
        <div className="title">Create new post</div>
        <div>
          <form>
            <textarea
              className="textField"
              placeholder="What's on your mind?"
              onChange={inputTextHandler}
            ></textarea>
          </form>
        </div>
        <div className="bottomButtons">
          <div className="uploadImage">
            <img src={uploadImage} alt="Upload Image" style={{width: "8vmax", marginTop: "1vmax",}} />
          </div>
          <div className="submit" onClick={submitPostHandler}>
           <img src={submitArrow} alt="Submit" style={{width: "6vmax", marginTop: "3vmax",}} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewPost;
