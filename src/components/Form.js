import { useState } from "react";
export default function Form(props) {
  // update style start
  // update style end
  // handel form data start
  const [formData, setFormData] = useState("");
  function handelChange(e) {
    setFormData(e.target.value);
  }
  const commentData = () => {
    const newComment = {
      img: "/assets/images/avatars/image-juliusomo.png",
      username: "juliusomo",
      isYou: true,
      score: 0,
      content: formData,
    };
    setFormData("");
    return newComment;
  };
  // handel form data end

  return (
    <div className="form" style={props.style}>
      <div className="form--img">
        <img src="/assets/images/avatars/image-juliusomo.png" alt="" />
      </div>
      <div className="form--textarea">
        <textarea
          value={formData}
          onChange={handelChange}
          placeholder="add a comment"
        />
      </div>
      <button
        className="form--button"
        onClick={() => {
          if (props.isReplyFor) {
            props.updateCommentsHandler(commentData(), props.isReplyFor);
          } else {
            props.updateCommentsHandler(commentData());
          }
          // eslint-disable-next-line no-lone-blocks
          {
            props.displayCommentForm && props.displayCommentForm();
          }
        }}
      >
        SEND
      </button>
    </div>
  );
}
