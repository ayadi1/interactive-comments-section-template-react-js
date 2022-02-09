import { useState, useEffect } from "react";
import axios from "axios";
import Form from "./components/Form";
import { Oval } from  'react-loader-spinner'
// import commentsData from "./data.json";
import GroupComment from "./components/GroupComment";
// import Alert from "./components/Alert";
import "./App.css";
function App() {
  const url = "http://localhost:5000/api/v1/";
  const [comments, setComments] = useState([]);

  // get data from server by axios start
  const getData = async () => {
    await axios(url).then((response) => {
      setComments(response.data.data);
    });
  };
  // get data from server by axios start

  // update UI  start
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // update UI  end

  // add comments script start
  async function updateCommentsHandler(newComments, isReplyTo = null) {
    if (newComments.content) {
      if (isReplyTo) {
        newComments.isReplayFor = isReplyTo;
      }
      await axios.post(url, newComments);
      getData();
    }
  }
  // add comments script end

  // delete comments script start
  async function handelDeleteComment(id) {
    await axios.delete(`${url}${id}`).catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
    getData();
  }
  // delete comments script end

  // render ui components script start
  const comments_in_screen = comments.map((item) => {
    return (
      <GroupComment
        commentsLength={comments.length}
        createdAt={item.createdAt}
        username={item.user.username}
        image={item.user.image.png}
        content={item.content}
        score={item.score}
        isYou={item.isYou}
        key={item._id}
        id={item._id}
        replays={item.replays}
        handelDeleteComment={handelDeleteComment}
        isReplayFor={item.isReplayFor}
        updateCommentsHandler={updateCommentsHandler}
      />
    );
  });
  // render ui components script start

  return (
    <div className="App">
      {
       comments.length<0? <Oval  /> :''
      }
      {comments_in_screen}
      <Form updateCommentsHandler={updateCommentsHandler} />
    </div>
  );
}

export default App;
