import React, { createContext, useReducer, useContext } from "react";
import {
  GOT_SUMMARY,
  GET_STATE,
  SET_CURRENT_POST,
  GET_ARTICLES,
  REMOVE_POST,
  UPDATE_POSTS,
  ADD_POST,
  ADD_FAVORITE,
  UPDATE_FAVORITES,
  REMOVE_FAVORITE,
  LOADING
} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.articles
      };
    // this is where the original code exist
    case GOT_SUMMARY:
      return {
        ...state,
        summary: action.summary,

      };

    case SET_CURRENT_POST:
      return {
        ...state,
        currentPost: action.post,
        loading: false
      };

    case UPDATE_POSTS:
      return {
        ...state,
        posts: [...action.posts],
        loading: false
      };

    case ADD_POST:
      return {
        ...state,
        posts: [action.post, ...state.posts],
        loading: false
      };

    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => {
          return post._id !== action._id;
        })
      };

    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [action.favorites, ...state.favorites],
        loading: false
      };

    case UPDATE_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites],
        loading: false
      };

    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((fav) => {
          return fav._id !== action._id;
        })
      };


    case LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    articles: [],
    searchTerm: "",
    summary: "",
    _id: "",
    favorites: "",
    loading: false,
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
