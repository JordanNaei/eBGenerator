import axios from "axios";

export default {

  getArticles: function (s) {
    return axios.get("http://newsapi.org/v2/everything?q=" + s + "&sortBy=publishedAt&apiKey=b21576c70cd24ab8a978d4b96c008837/");
  },

  saveArticle: function (postData) {
    return axios.post("/api/posts", postData);
  },

  getFavorites: function () {
    return axios.get("/api/favorites");
  },

    deletePost: function (id) {
    return axios.delete("/api/delete/" + id);
  },

  getArticleSummary: function (u) {
    var options = {
      method: 'GET',
      url: 'https://summarization3.p.rapidapi.com/summary/v1/',
      params: {
        url: u
      },
      headers: {
        'x-rapidapi-key': '59c11c034emshcfca09d2b8668d2p1f70bejsn4dd1fc60d3db',
        'x-rapidapi-host': 'summarization3.p.rapidapi.com'
      }
    };
    return axios.request(options)
  }

  // getPhoto: function() {
  //   return axios.get("https://api.pexels.com/v1/search?query=american+army", {
  //       headers: {"Authorization": "563492ad6f91700001000001a472dd328cdb4dd089b49463f38ddf5a"},
  //   });
  // },

  // // Gets all posts

  // // Gets the post with the given id
  // getPost: function (id) {
  //   return axios.get("/api/posts/" + id);
  // },
  // // Deletes the post with the given id
  // deletePost: function (id) {
  //   return axios.delete("/api/posts/" + id);
  // },
  // // Saves a post to the database
  // savePost: function (postData) {
  //   return axios.post("/api/posts", postData);
  // }
};
