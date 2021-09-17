import Navbar from "../src/components/Navbar/Navbar";
import PostImage from "../src/components/PostImage/PostImage";
import PostText from "../src/components/PostText/PostText";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateNewPost from "../src/components/CreateNewPost/CreateNewPost";
import Profile from "./components/Profile/Profile";

import detectEthereumProvider from '@metamask/detect-provider';

function App() {
  const [posts, setPosts] = useState([]);

  function newPostHandler(newPost) {
    setPosts([ newPost, ...posts ])
  }

  return (
    <Router>
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/">
            <PostImage text="ehhhh" />
      

            {posts.map((post) =>
                <PostImage key={post.id} text={post.text} img={post.file} />
                


            )}
          </Route>
          <Route exact  path="/create">
            <CreateNewPost
              onSubmit={newPostHandler}
            />
          </Route>
          <Route exact path="/profile">
            <Profile username="bigBoyMIKE" walletAddress="0x91AEEDE11Cb99a060696B9936B5512b51646329f"/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
