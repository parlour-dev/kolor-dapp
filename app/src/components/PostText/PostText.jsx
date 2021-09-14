import "../PostText/PostText.css";
function PostText(text) {
  const input = Object.values(text);

  return (
    <div className="post">
      <div className="container">
        <div className="creator">
          <div className="creatorInfo">
            <div className="creatorNick">Jarosław Jakimowicz</div>
            <div className="creatorWallet">0x102938a290d90109d29132189189d</div>
          </div>
          <div className="profPicture"> </div>
        </div>
        <div className="text">{input}</div>
        <div className="viewerAction">
          <div className="button">Appreciate</div>
          <div className="button buttonBlack">Comment</div>
        </div>
      </div>
    </div>
  );
}

export default PostText;
