import Navbar from "../src/components/Navbar/Navbar";
import PostImage from "../src/components/PostImage/PostImage";
import PostText from "../src/components/PostText/PostText";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import CreateNewPost from "../src/components/CreateNewPost/CreateNewPost";

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <PostImage />
          <PostText />
        </Route>
        <Route path='/create'>
          <CreateNewPost />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
