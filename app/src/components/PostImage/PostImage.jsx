import "../PostImage/PostImage.css"
function PostImage() {


    return <div className="post">

        <div className="container">
            <div className="creator">
                <div className="creatorinfo">
                    <div className="creatornick">Krystyna Pawłowicz</div>
                    <div className="creatorwallet">0x1029381d89889hf98189dh981</div>
                </div>
                <div className="profpicture"></div> 
            </div>  
            <div className="text">Jakiś Bono z proafrykańskiej partii JUTU spotkał się gdzieś z niemiecko-maltańskim UE kierownikiem D.Tuskiem z partii proniemieckiej by ...ha,ha,ha...by ...ha,ha,ha...”rozmawiać” o ..ha,ha,ha,o „POLSKIEJ”, !!! ,o ..ha,ha,ha...o „POLSKIEJ POLITYCE” !!! Ha,ha </div>  
            <div className="mediacontent"></div>
            <div className="vieweraction">
              <div className="button">Appreciate</div>  
              <div className="button button-black">Comment</div>  
            </div>
        </div>
    </div>;
}

export default PostImage;
