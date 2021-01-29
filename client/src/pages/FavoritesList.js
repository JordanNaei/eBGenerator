import React, { useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_FAVORITE, LOADING, ADD_FAVORITE } from "../utils/actions";
import API from "../utils/API";
import "../styles/sumStyle.css";


const FavoritesList = () => {
  const [state, dispatch] = useStoreContext();

  const getFavorites = () => {
    dispatch({ type: LOADING });
    API.getFavorites().then((res) => {
      dispatch({
        type: ADD_FAVORITE,
        favorites: res.data
      });
    })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getFavorites();
  }, []);


  const removeFromFavorites = (e) => {
    API.deletePost(e.target.id).then(res => {
      console.log(res);
      dispatch({ type: LOADING });
      dispatch({
        type: REMOVE_FAVORITE,
        _id: e.target.id
      });
    })
  };


  return (
    <div className="contianer-fluid">
      <Link to="/" className="ta">Home</Link>
      <div className="container mb-5 mt-5">
        <table className="table hi">
          <thead>
            <tr>
              <th className="he">Summary</th>
              <th className="he">Remove</th>
            </tr>
          </thead>
          <tbody>
            {state.favorites  ? (
              state.favorites.map((f) => (
                <tr>
                  <td>{f.summary}</td>
                  <td><span onClick={(e) => removeFromFavorites(e)} className="delete-btn" role="button" tabIndex="0" id={f._id}>✗</span></td>
                </tr>
              ))) : (<td> No articles to show</td>)}
          </tbody>
        </table>
        <div className="mt-5">
        </div>
      </div>
    </div>
  );
};

export default FavoritesList;
