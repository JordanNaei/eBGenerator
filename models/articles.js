const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articlesSchema = new Schema({
  summary: { type: String},
  id: { type: String, required: true},
});

const Article = mongoose.model("Article", articlesSchema);

module.exports = Article;
