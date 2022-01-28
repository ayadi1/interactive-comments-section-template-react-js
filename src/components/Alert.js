export default function Alert() {
  return (
    <div className="alert">
      <h3 className="alert--title">Delete comment</h3>
      <p className="alert--msg">
        Are you sure you want to delete this comment? This will remove the
        comment and can't undone.
      </p>
      <div className="alert--button">
        <div className="alert--button__NO">NO, CANCEL</div>
        <div className="alert--button__YES">YES, DELETE</div>
      </div>
    </div>
  );
}
