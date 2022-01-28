import Comment from "./Comment";
export default function GroupComment(props) {
  return (
    <>
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
      />
      {props.replies.length > 0 &&
        props.replies.map((item) => {
          return (
            <Comment
              isReplies={true}
              createdAt={item.createdAt}
              username={item.user.username}
              image={item.user.image.png}
              content={item.content}
              score={item.score}
              isYou={item.isYou}
              key={item.id}
              replies={item.replies}
              isReplyingTo={item.replyingTo}
              handelDeleteComment={props.handelDeleteComment}
              id={item.id}
            />
          );
        })}
    </>
  );
}
