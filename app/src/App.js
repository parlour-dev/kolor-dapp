import Navbar from "../src/components/Navbar/Navbar";
import PostImage from "../src/components/PostImage/PostImage";
import PostText from "../src/components/PostText/PostText";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateNewPost from "../src/components/CreateNewPost/CreateNewPost";

function App() {
  const [inputText, setInputText] = useState("");
  const [posts, setPosts] = useState([]);
  const [file, setFile] = useState();
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/">
            {posts.map((post) => {
              console.log(post);
              return (
                <PostImage key={post.id} text={post.text} img={post.file} />
              );
            })}
          </Route>
          <Route path="/create">
            <CreateNewPost
              posts={posts}
              setPosts={setPosts}
              inputText={inputText}
              setInputText={setInputText}
              file={file}
              setFile={setFile}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
