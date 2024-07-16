const apiURL = "https://f9vs6w-8080.csb.app/questions";
import { renderQuestion, addEventAnswer, finish } from "../js/script.js";
export const params = { _limit: 1, _page: 1 };
export const getQuestion = async (params = {}) => {
  let query = new URLSearchParams(params).toString();
  if (query) {
    query = "?" + query;
  }
  const response = await fetch(apiURL + query);
  const data = await response.json();
  const totalRecords = response.headers.get("x-total-count");
  const totalPages = Math.ceil(totalRecords / params._limit);
  if (params._page > totalPages) {
    finish(totalPages);
  } else {
    renderQuestion(data, totalPages);
    addEventAnswer(data, totalPages);
  }
};
