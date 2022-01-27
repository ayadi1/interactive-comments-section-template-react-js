import { useState } from "react";
import Form from "./components/Form";
import commentsData from "./data.json";
import GroupComment from "./components/GroupComment";
import "./App.css";
function App() {
  const [comments, setComments] = useState(commentsData["comments"]);

  // add comments script start
  function updateCommentsHandler(newComments) {
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
          const newReply = element.replies.filter((item) => item.id !== id);
          element.replies = newReply;
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

  // update score script start
  const addToScore = (id) => {};
  const subToScore = (id) => {};
  // update score script end

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
        key={item.id}
        id={item.id}
        replies={item.replies}
        handelDeleteComment={handelDeleteComment}
        isReplyingTo={item.replyingTo}
        subToScore={subToScore}
        addToScore={addToScore}
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
