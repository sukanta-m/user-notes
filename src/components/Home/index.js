
import { fetchNewsAction } from "../../modules/actions/news";

import { connect } from "react-redux";
import { get } from "lodash";

import HackerNews from "./container/NewsList";

export default connect((state) => ({
  fetching: get(state, "news.fetching", false),
  news: get(state, "news.lists", [])
}), {
  fetchNews: fetchNewsAction
})(HackerNews);