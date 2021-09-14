import "../PostImage/PostImage.css"
import { useState } from "react";



function PostImage(text) {
    const input = Object.values(text);
    const [file,  setFile] = useState();

    

    {/*<img src={uploadImage} alt="Upload Image" style={{width: "8vmax", marginTop: "1vmax",}}></img> */ }



    const handleChange = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]))
    }


    return <div className="post">

        <div className="container">
            <div className="creator">
                <div className="creatorInfo">
                    <div className="creatorNick">ja</div>
                    <div className="creatorWallet">0x1029381d89889hf98189dh981</div>
                </div>
                <div className="profPicture"></div>
            </div>
            <div className="text">{input} </div>
            <div className="mediaContent">
                
                {/* <img src={file} onChange={handleChange} /> */}
              <input type="file" onChange={handleChange}/><img src={file}/>
            </div>
            <div className="viewerAction">
                <div className="button">Appreciate</div>
                <div className="button buttonBlack">Comment</div>
            </div>
        </div>
    </div>;
}

export default PostImage;
