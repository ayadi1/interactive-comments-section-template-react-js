import { useState } from "react";
export default function Form(props) {
  const [formData, setFormData] = useState("");
  function handelChange(e) {
    setFormData(e.target.value);
  }
  const commentData = () => {
    const newComment = {
      id: new Date().getMilliseconds(),
      user: {
        image: {
          png: "./assets/images/avatars/image-juliusomo.png",
          webp: "./assets/images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
      isYou: true,
      createdAt: "2 days ago",
      score: 0,
      content: formData,
      replies: [],
    };
    setFormData("");
    return newComment;
  };
  return (
    <div className="form">
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
        onClick={() => props.updateCommentsHandler(commentData())}
      >
        SEND
      </button>
    </div>
  );
}
