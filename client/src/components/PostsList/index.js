import React, { useEffect } from "react";
import nextId from "react-id-generator";
import { useHistory, Link } from "react-router-dom";
import { LOADING, GOT_SUMMARY } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import "../../styles/artstyle.css";


function PostsList() {
  const [state, dispatch] = useStoreContext();
  const h = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => console.log("Hello, World!"), 3000);
    return () => clearTimeout(timer);
  }, [state.articles, state.summary]);


  const getArticleSummary = (e) => {
    console.log(e.target.id);
    e.preventDefault()
    API.getArticleSummary(e.target.name).then(res => {
      dispatch({
        type: GOT_SUMMARY,
        summary: res.data.Summary
      });
      dispatch({ type: LOADING, loading: true });
      h.push("/summary/" + e.target.id);
    }).catch(err => console.log(err));
  };

  return (
    <div>
      <h1 className="theader">Article Search Result</h1>
      {state.articles.length > 0 ? (
        <table className="table arttab table-hover table-fixed">
          <thead>
            <tr>
              <th className="h">Image</th>
              <th className="h">Title</th>
              <th className="h">Summary</th>
            </tr>
          </thead>
          <tbody>
            {state.articles 
              .map((article, i) => (
                <tr>
                  <td><img className="img" alt={"Article picture"} src={article.urlToImage || ""}  /></td>
                  <td><a href={article.url} target='_blank'>{article.title.substring(0, 40) || ""}...</a></td>
                  <td><input type="button" value="Summarize" name={article.url || ""} id={nextId(i)} onClick={(e) => getArticleSummary(e)} /></td>
                </tr>
              ))
            }
          </tbody>
        </table>

      ) : (
          <table className="table arttab">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Summary</th>
            </tr>
          </table>
        )}
      <div className="mt-5 align-right">
        <Link to="/favorites" className="tager">View favorites</Link>
      </div>
    </div>
  )

}

export default PostsList;
