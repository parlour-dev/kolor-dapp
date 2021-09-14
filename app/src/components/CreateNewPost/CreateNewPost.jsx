import React from "react";
import styles from "../CreateNewPost/CreateNewPost.css";
import uploadImage from "../CreateNewPost/image.png";
import submitArrow from "../CreateNewPost/arrow.png";
import PostImage from "../PostImage/PostImage";
import ImageUploading from 'react-images-uploading';
import { useHistory } from "react-router-dom";


const CreateNewPost = ({inputText, setInputText, posts, setPosts, file,  setFile, props}) => {
  


  
  let history = useHistory();
  
  const submitPhotoHandler = (e) =>{
    console.log(e.target.files[0].name)
    setFile(e.target.files[0].name);
  }

  
  // const submitPhotoHandler = (e) => {

  //   console.log(e.target.value);
  //   setFile(e.target.value);
  // };



  const inputTextHandler = (e) => {
    console.log(e.target.value);
    setInputText(e.target.value);
  };

  const submitPostHandler = (e) => {
    e.preventDefault();
    setPosts([{text: inputText, file: setFile,  wallet: "creatorWallet", nick: "creatorNick", id: Math.random()*1000},  ...posts, ]);
  

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
          {/*<img src={uploadImage} alt="Upload Image" style={{width: "8vmax", marginTop: "1vmax",}}></img> */}
          <input type='file' id='multi'/>
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
