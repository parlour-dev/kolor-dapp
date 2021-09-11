import "../PostText/PostText.css"
function PostText() {


    return <div className="post">

        <div className="container">
            <div className="top">
                <div className="user">
                    <div className="contentcreator">
                    <div className="creatornick">Jarosław Jakimowicz</div>
                    <div className="creatortag">0x102938a290d90109d29132189189d</div>
                    </div>
                    <div className="profpicture"> </div>
                    
                </div>  
                <div className="text">Mam dwóch synów: 19-letniego i 15-letniego. Żaden z nich nie posługuje się takim językiem ani nie odnosi się do rodziców w ten sposób, co raper Mata. Rap mi się kojarzył zawsze z muzyką biedy, ulicą, muzyką dla tych, którzy są trochę odrzuceni i nie bardzo mają jakąś przyszłość. A tymczasem tu mamy bananowego chłopca, który wcale nie żyje na ulicy. Ta piosenka pokazuje ewidentnie braki w wychowaniu tego młodzieńca. To jest jego jakiś chory bunt. Jest z dobrego domu, a udaje gangsta. Ja bym go posłał do wojska.</div>  
            </div>
           
            <div className="bot">
              <div className="button">Appreciate</div>  
              <div className="button button-black">Comment</div>  
            </div>
        </div>
    </div>;
}

export default PostText;

