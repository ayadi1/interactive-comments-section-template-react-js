import { useState } from "react";
import Form from "./Form";
import Alert from "./Alert";
import axios from "axios";
export default function Comment(props) {
  const url = "http://localhost:5000/api/v1/";

  const [score, setScore] = useState(props.score);

  const style = props.isReplies ? { width: "80%", marginLeft: "auto" } : {};

  const [formVisibility, setFormVisibility] = useState({
    display: "none",
    width: "80%",
    marginLeft: "auto",
  });
  const [alertHandler, setAlertHandler] = useState({
    display: "none",
    id: null,
    response: false,
  });

  // update form display start
  const displayCommentForm = () => {
    setFormVisibility((oldData) => {
      if (oldData.display === "none") {
        return {
          ...oldData,
          display: "flex",
        };
      } else {
        return {
          ...oldData,
          display: "none",
        };
      }
    });
  };
  // update form display end

  // update score script start
  const addToScore = async () => {
    const add = await axios
      .patch(`${url}${props.id}`, { score: 1 })
      .catch(function (error) {
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
    setScore(add.data.data.score);
  };
  const subToScore = async () => {
    const sub = await axios
      .patch(`${url}${props.id}`, { score: -1 })
      .catch(function (error) {
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
    setScore(sub.data.data.score);
  };
  // update score script end
  // date handler script start
  const date = new Date(props.createdAt);
  const createdAt = `${date.getUTCDay()}-${date.getUTCMonth()}-${date.getUTCFullYear()}`;
  // date handler script end
  // handel Delete Comment start
  const handelDeleteComment = () => {
    setAlertHandler((old) => {
      return {
        ...old,
        display: "flex",
      };
    });
  };
  const handleDeleteFalse = async () => {
    setAlertHandler((old) => {
      return {
        ...old,
        display: "none",
      };
    });
  };
  const handleDeleteTrue = async (id) => {
    props.handelDeleteComment(props.id);
    setAlertHandler((old) => {
      return {
        ...old,
        display: "none",
      };
    });
  };
  // handel Delete Comment end
  return (
    <>
      <Alert
        display={alertHandler.display}
        handleDeleteFalse={handleDeleteFalse}
        handleDeleteTrue={handleDeleteTrue}
        id={props.id}
      />
      <div className="comment" style={style}>
        <div className="comment--count">
          <p className="comment--count__add" onClick={addToScore}>
            +
          </p>
          {score}
          <p className="comment--count__sub" onClick={subToScore}>
            -
          </p>
        </div>
        <div className="comment--body">
          <div className="comment--body__header">
            <div className="comment--user--info">
              <img
                className="comment--user--info__img"
                src={props.image}
                alt=""
              />
              <p className="comment--user--info__name">{props.username}</p>
              {props.isYou && <p className="comment--user--info__badge">you</p>}
              <p className="comment--user--info__createdAt">{createdAt}</p>
            </div>
            <div className="comment--action">
              <div className="comment--action__reply">
                <img
                  className="comment--action__reply__img"
                  src="/assets/images/icon-reply.svg"
                  alt=""
                />
                <p
                  className="comment--action__reply__text"
                  onClick={displayCommentForm}
                >
                  Reply
                </p>
              </div>
              {props.isYou && (
                <div
                  className="comment--action__delete"
                  // onClick={() => props.handelDeleteComment(props.id)}
                  onClick={handelDeleteComment}
                >
                  <img
                    className="comment--action__delete__img"
                    src="/assets/images/icon-delete.svg"
                    alt=""
                  />
                  <p className="comment--action__delete__text">Delete</p>
                </div>
              )}
            </div>
          </div>
          <div className="comment--content">{props.content}</div>
        </div>
      </div>
      <Form
        style={formVisibility}
        displayCommentForm={displayCommentForm}
        isReplyFor={props.id}
        updateCommentsHandler={props.updateCommentsHandler}
      />
    </>
  );
}
