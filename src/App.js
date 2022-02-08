import { useState, useEffect } from "react";
import axios from "axios";
import Form from "./components/Form";
// import commentsData from "./data.json";
import GroupComment from "./components/GroupComment";
// import Alert from "./components/Alert";
import "./App.css";
function App() {
  const [comments, setComments] = useState([]);
  // get data from server start
  useEffect(() => {
    const getData = async () => {
      await axios("http://localhost:5000/api/v1/").then((response) => {
        setComments(response.data.data);
      });
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // get data from server end

  // add comments script start
  function updateCommentsHandler(newComments, isReplyTo = null) {
    if (newComments.content) {
      setComments((old) => {
        return [...old, newComments];
      });
    }
  }
  // add comments script end

  // delete comments script start
  function handelDeleteComment(id, isReplyingTo) {
    let newComment = [];
    if (isReplyingTo) {
      comments.forEach((element) => {
        if (element.user.username === isReplyingTo) {
          const newReply = element.replays.filter((item) => item.id !== id);
          element.replays = newReply;
          console.log(newReply);
        }
        newComment.push(element);
      });
    } else {
      comments.forEach((element) => {
        if (element.id !== id) {
          newComment.push(element);
        }
      });
    }
    setComments(newComment);
  }
  // delete comments script end

  // render ui components script start
  const comments_in_screen = comments.map((item) => {
    return (
      <GroupComment
        createdAt={item.createdAt}
        username={item.user.username}
        image={item.user.image.png}
        content={item.content}
        score={item.score}
        isYou={item.isYou}
        key={item._id}
        id={item.id}
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
      {comments_in_screen}
      <Form updateCommentsHandler={updateCommentsHandler} />
    </div>
  );
}

export default App;
