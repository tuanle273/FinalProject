import axios from "axios";
import React, { createContext, useReducer } from "react";
import { postReducer } from "../reducers/postReducer";
import { apiUrl } from "./constants";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  //State

  const [postState, dispatch] = useReducer(postReducer, {
    posts: [],
    postLoading: true,
  });

  //get all posts

  const getPosts = async () => {
    try {
      const respone = await axios.get(apiUrl + "/posts");
      if (respone.data.success) {
        dispatch({ type: "POSTS_LOADED_SUCCESS", payload: respone.data.posts });
      }
    } catch (error) {
      dispatch({ type: "POSTS_LOADED_FAIL" });
    }
  };

  // post context data

  const postContextData = { postState, getPosts };
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
