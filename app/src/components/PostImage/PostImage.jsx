import "../PostImage/PostImage.css";
import { useState } from "react";

function PostImage({ text, img }) {
  const input = Object.values(text);

  /*<img src={uploadImage} alt="Upload Image" style={{width: "8vmax", marginTop: "1vmax",}}></img> */

  console.log("text: " + text);
  console.log("img: " + img);

  return (
    <div className="post">
      <div className="container">
        <div className="creator">
          <div className="creatorInfo">
            <div className="creatorNick">ja</div>
            <div className="creatorWallet">0x1029381d89889hf98189dh981</div>
          </div>
          <div className="profPicture"></div>
        </div>
        <div className="text">{input} hihi</div>
        <div className="mediaContent">
          <img alt="mmm" src={img} className="mediaContent" />
        </div>
        <div className="viewerAction">
          <div className="button">Appreciate</div>
          <div className="button buttonBlack">Comment</div>
        </div>
      </div>
    </div>
  );
}

export default PostImage;
