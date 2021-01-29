import React, { useRef } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { GET_ARTICLES, LOADING } from "../../utils/actions";
import API from "../../utils/API";
import "../../styles/homeStyle.css";

function CreatePostForm() {
  const searchRef = useRef();
  const [state, dispatch] = useStoreContext();
  
  const handleSubmit = e => {
    e.preventDefault()
    dispatch({ type: LOADING, loading: true });
    const search = searchRef.current.value.trim();
    API.getArticles(search).then((result) => {
      if (result.data.articles.length < 1) {
        console.log("we got no articles");
        dispatch({
          type: GET_ARTICLES,
          articles: []
        });
      }
      console.log("seko", result.data.articles);
      dispatch({
        type: GET_ARTICLES,
        articles: result.data.articles
      });
    }).catch(err => {
      dispatch({
        type: GET_ARTICLES,
        articles: []
      });
      console.log(err)
    });
  }
  return (
    <div >
      <div className=" yandal3 tit2">

        <span for="m"><h1 className="mHead">The Land Of The Free</h1></span>
        <img
          className="img-fluid img-thumbnail yan"
          src="https://api.army.mil/e2/c/images/2020/07/27/ded5a369/max1200.jpg"
          id="m"
        />
      </div>
      <div className="yandal">
        <h1>Members Article Search</h1>
        <form className="form-group mt-3 mb-3 text-center" onSubmit={handleSubmit}>
          <input className="form-control mb-3 col-6 yandal1" ref={searchRef} placeholder="Search Term" />
          <button className="btn btn-light mt-3 mb-5" type="submit">
            Search
        </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostForm;
