import styles from "./PostImage.module.css";
import Comments from "./Comments/Comments";
import AddComment from "./Comments/AddComment";

import ReactDOM from 'react-dom';
import Tips from "../Tips/Tips";

function PostImage({ text, img }) {

  var EtherTips = 0;
  var DaiTips = 0;

  function renderTips()
{
  if (EtherTips>0 || DaiTips>0) {
    ReactDOM.render(<Tips/>, document.getElementById("renderTips"));
 }

}

  function renderCommentHandler() {
  ReactDOM.render(<AddComment/>, document.getElementById("renderAddComment"));
  }


  return (
    <div className={styles.post}>
      <div className={styles.container}>
        <div className={styles.creator}>
          <div className={styles.creatorInfo}>
            <div className={styles.creatorNick}>ja</div>
            <div className={styles.creatorWallet}>0x1029381d89889hf98189dh981</div>
          </div>
          <div className={styles.profPicture}></div>
        </div>
        <div className={styles.text}>{text}</div>
        <div className={styles.mediaContent}>
          <img alt="" src={img} className={styles.mediaContent} />
        </div>
        <div  onload={renderTips()} id="renderTips"></div>
      
        <div className={styles.viewerAction}>
          <div className={styles.buttonBlue}>Appreciate</div>
          <div  className={styles.buttonBlack} onClick={renderCommentHandler}>Comment</div>
        </div>  
        <div id="renderAddComment"></div>
        <Comments/>
      </div>
    </div>
  );
}

export default PostImage;
