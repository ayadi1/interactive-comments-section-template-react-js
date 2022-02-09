export default function Alert(props) {
  return (
    <div className="alert" style={{ display: props.display }}>
      <h3 className="alert--title">Delete comment</h3>
      <p className="alert--msg">
        Are you sure you want to delete this comment? This will remove the
        comment and can't undone.
      </p>
      <div className="alert--button">
        <div
          className="alert--button__NO"
          onClick={() => props.handleDeleteFalse()}
        >
          NO, CANCEL
        </div>
        <div
          className="alert--button__YES"
          onClick={() => props.handleDeleteTrue(props.id)}
        >
          YES, DELETE
        </div>
      </div>
    </div>
  );
}
