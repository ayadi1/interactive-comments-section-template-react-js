import { useState } from "react";
export default function Comment(props) {
  const style = props.isReplies ? { width: "80%", marginLeft: "auto" } : {};
  const [score, setScore] = useState(props.score);
  // update score script start
  const addToScore = () => {
    setScore((old) => ++old);
    console.log(score);
  };
  const subToScore = () => {
    setScore((old) => --old);
  };
  // update score script end
  return (
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
            <p className="comment--user--info__createdAt">{props.createdAt}</p>
          </div>
          <div className="comment--action">
            <div className="comment--action__reply">
              <img
                className="comment--action__reply__img"
                src="/assets/images/icon-reply.svg"
                alt=""
              />
              <p className="comment--action__reply__text">Reply</p>
            </div>
            {props.isYou && (
              <div
                className="comment--action__delete"
                onClick={() =>
                  props.handelDeleteComment(props.id, props.isReplyingTo)
                }
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
  );
}
