import Navbar from "../src/components/Navbar/Navbar";
import PostImage from "../src/components/PostImage/PostImage";
// import PostText from "../src/components/PostText/PostText"
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <PostImage />
      {/* //<PostText />  */}
    </div>
  );
}

export default App;
