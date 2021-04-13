const axios = require("axios");
const request = require("request");
const superagent = require("superagent");

const URL = "https://cat-fact.herokuapp.com/facts";

axios
  .get(URL)
  .then(function (response) {
    console.log("axios response: ", response.data[0].text);
  })
  .catch(function (error) {
    console.log(error);
  });

request({ url: URL, json: true }, function (error, response, body) {
  if (error) {
    console.error("error:", error);
  } else {
    console.log("request response: ", body[0].text);
  }
});

superagent
  .get(URL)
  .then((response) =>
    console.log("superagent response: ", response.body[0].text)
  )
  .catch((error) => console.log(error));
