import React, { createContext } from 'react';
import { apiUrl } from './constants';

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
    //State

    const [postState, dispatch] = useReducer(postReducer, {
        posts: []
        ,postLoading: true
    })

    //get all posts

    const getPosts = async () => {
        try {
            const respone = await axios.get(apiUrl + "/posts")
            if (respone.data.success) {
                dispatch({ type: 'POST_LOADED_SUCCESS', payload: respone.data.posts })
            }
        } catch (err) {
            
        }
        return (
            <PostContext.Provider value={postContextData}>
                {children}
            </PostContext.Provider>
        )
    }
    export default PostContextProvider;