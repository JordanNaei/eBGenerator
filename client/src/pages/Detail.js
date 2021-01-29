import React, { useEffect, match } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
import { ADD_FAVORITE} from "../utils/actions";
import "../styles/sumStyle.css";

const Detail = () => {
  const [state, dispatch] = useStoreContext();
  const match = useRouteMatch();

  useEffect(() => {

  }, []);

  const addFavorite = (e) => {
    console.log(e.target.name, e.target.id);
    API.saveArticle({
      id: e.target.id,
      summary: e.target.name
    }).then(res => {
      console.log(res);
      dispatch({
        type: ADD_FAVORITE,
        favorites: res.data
      });
    })
  };

  // const removeFavorite = () => {
  //   dispatch({
  //     type: REMOVE_FAVORITE,
  //     _id: state.currentPost._id
  //   });
  // };

  return (

    <div class="card-body">
      <h1 class="card-title text-center">Summary</h1>
      <p class="card-text">{state.summary}</p>
      <Link to="/" class="btn btn-primary b1">Home</Link>
      <a id={match.params.id} name={state.summary} class="btn btn-danger" onClick={(e) => addFavorite(e)}>Add To Favorites</a>
    </div>

  );
};

export default Detail;
