import Comment from "./Comment";
import axios from "axios";
import { useEffect, useState } from "react";
export default function GroupComment(props) {

  const [replays, setReplays] = useState([]);

  useEffect(() => {

    const getData = async () => {
      props.replays.forEach(async (itemID) => {
        const comment = await axios.get(
          `http://localhost:5000/api/v1/${itemID}`
        );
        setReplays((oldComment) => {
          return [...oldComment, comment];
        });
      });
    };

    getData();
    
  }, []);
  return (
    <>
      {props.isReplayFor.length <=0 && (
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
              id={item.data.data.id}
              updateCommentsHandler={props.updateCommentsHandler}
            />
          );
        })}
    </>
  );
}
