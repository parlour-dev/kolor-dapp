import "../PostImage/PostImage.css"
function PostImage() {


    return <div className="post">

        <div className="container">
            <div className="creator">
                <div className="creatorInfo">
                    <div className="creatorNick"></div>
                    <div className="creatorWallet">0x1029381d89889hf98189dh981</div>
                </div>
                <div className="profPicture"></div> 
            </div>  
            <div className="text">Jakiś ey </div>  
            <div className="mediaContent"></div>
            <div className="viewerAction">
              <div className="button">Appreciate</div>  
              <div className="button buttonBlack">Comment</div>  
            </div>
        </div>
    </div>;
}

export default PostImage;
