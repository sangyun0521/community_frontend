import React, { useState } from "react";
import { Link } from "react-router-dom";
import postComment from "../api/comment";
import "../css/Comment.css";

const Comment = (props) => {
  const articleId = props.articleId;
  const parentId = props.commentId;
  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState("");

  const dateFormat = (date) => {
    let format = (date || "").split("T");
    return format[0] + " " + (format[1] || "").split(".")[0];
  };

  const saveComment = (event) => {
    setComment(event.target.value);
  };
  const handleComment = () => {
    postComment({
      articleId: articleId,
      parentId: parentId,
      content: comment,
    });
    setVisible(false);
    window.location.reload();
  };
  return (
    <div id="wrapper">
      <div className="parent">
        <div id="comment_info">
          <div>{props.comment.username}</div>
          <div>{dateFormat(props.comment.dateCreated)}</div>
          <div onClick={() => setVisible(!visible)}>댓글</div>
        </div>
        <div id="comment_content">{props.comment.content}</div>
      </div>
      <div id="children">
        {props.comment.children.map((child) => {
          console.log(child);
          return (
            <div key={child.commendId} id={child.commendId} className="child">
              <div className="child_icon">↳</div>
              <div>
                <div id="comment_info">
                  <div>{child.username}</div>
                  <div>{dateFormat(child.dateCreated)}</div>
                </div>
                <div>{child.content}</div>
              </div>
            </div>
          );
        })}
      </div>
      {visible === true ? (
        <div id="recomment">
          <div id="input_form">
            <textarea
              id="comment_input"
              rows={3}
              onChange={saveComment}
            ></textarea>
            <button id="comment_btn" onClick={handleComment}>
              확인
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Comment;
