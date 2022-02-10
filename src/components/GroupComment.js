import Comment from "./Comment";
import axios from "axios";
import { useEffect, useState } from "react";
export default function GroupComment(props) {
  const [replays, setReplays] = useState([]);

  useEffect(() => {
    setReplays([]);
    const getData = async () => {
      props.replays.forEach(async (itemID) => {
        const comment = await axios
          .get(`[api-url-here]/${itemID}`)
          .catch((error) => {
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
        setReplays((oldComment) => {
          return [...oldComment, comment];
        });
      });
    };

    getData();
  }, [props.replays]);
  return (
    <>
      {props.isReplayFor.length <= 0 && (
        <Comment
          createdAt={props.createdAt}
          username={props.username}
          image={props.image}
          content={props.content}
          score={props.score}
          isYou={props.isYou}
          handelDeleteComment={props.handelDeleteComment}
          id={props.id}
          isReplyingTo={props.isReplyingTo}
          updateCommentsHandler={props.updateCommentsHandler}
        />
      )}

      {replays.length > 0 &&
        replays.map((item) => {
          return (
            <Comment
              isReplies={true}
              createdAt={item.data.data.createdAt}
              username={item.data.data.user.username}
              image={item.data.data.user.image.png}
              content={item.data.data.content}
              score={item.data.data.score}
              isYou={item.data.data.isYou}
              key={item.data.data._id}
              replays={item.data.data.replays}
              isReplyingTo={item.data.data.replyingTo}
              handelDeleteComment={props.handelDeleteComment}
              id={item.data.data._id}
              updateCommentsHandler={props.updateCommentsHandler}
            />
          );
        })}
    </>
  );
}
