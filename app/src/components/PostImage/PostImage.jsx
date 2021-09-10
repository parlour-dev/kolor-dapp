import '../PostImage/Post.css'
function PostImage() {


    return <div className="post">

        <div className="container">
            <div className="top">
                <div className="user">
                    <div className="contentcreator">
                    <div className="creatornick">Krystyna Pawłowicz</div>
                    <div className="creatortag">@KrystPawlowicz</div>
                    </div>
                    <div className="profpicture"> </div>
                    
                </div>  
                <div className="text">Jakiś Bono z proafrykańskiej partii JUTU spotkał się gdzieś z niemiecko-maltańskim UE kierownikiem D.Tuskiem z partii proniemieckiej by ...ha,ha,ha...by ...ha,ha,ha...”rozmawiać” o ..ha,ha,ha,o „POLSKIEJ”, !!! ,o ..ha,ha,ha...o „POLSKIEJ POLITYCE” !!! Ha,ha </div>  
            </div>
            <div className="middle"></div>
            <div className="bot">
              <div className="appreciate">Appreciate</div>  
              <div className="comment">Comment</div>  
            </div>
        </div>
    </div>;
}

export default PostImage;
