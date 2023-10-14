import { useState, useEffect } from "react";

import styled from "styled-components";

import getPostData from "../../data/getPostData.js";

const PostWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LikeButton = styled.button`
  background-color: ${(props) => (props.isLiked ? "gray" : "#6fb7b7")};
  border-radius: 4px;
  padding: 6px 8px;
  cursor: pointer;
  margin-top: 8px;
  color: white;
`;

export default function Home() {
  // get post data when the page is loaded
  const [postData, setPostData] = useState([]);

  // record number of likes of each post
  const [likeCount, setLikeCount] = useState([]);

  // record if the user has liked a post
  const [liked, setLiked] = useState([]);

  // get post data when the page is loaded
  useEffect(() => {
    getPostData().then((data) => {
      setPostData(data);
      setLikeCount(Array(data.length).fill(0));
      setLiked(Array(data.length).fill(false));
    });
  }, []);

  const handleLikeClick = (postId) => {
    // copy arrays
    const likeCountCopy = [...likeCount];
    const likedCopy = [...liked];

    // toggle the value
    if (liked[postId]) {
      likeCountCopy[postId]--;
    } else {
      likeCountCopy[postId]++;
    }

    likedCopy[postId] = !likedCopy[postId];

    // set state
    setLikeCount(likeCountCopy);
    setLiked(likedCopy);
  };

  return (
    <>
      {postData.map((postDetail) => {
        return (
          <div key={postDetail.id}>
            <PostWrapper>
              <h1 style={{ fontSize: 25 }}>
                <b>{postDetail.title}</b>
              </h1>
              <hr />
              <br />
              <p>
                <b style={{ whiteSpace: "pre-line" }}>{postDetail.content}</b>
              </p>
              <LikeButton
                isLiked={liked[postDetail.id]}
                onClick={() => {
                  handleLikeClick(postDetail.id);
                }}
              >
                👍 ({likeCount[postDetail.id]})
              </LikeButton>
            </PostWrapper>
          </div>
        );
      })}
    </>
  );
}
