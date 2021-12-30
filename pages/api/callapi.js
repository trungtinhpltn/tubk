// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Axios from "axios";
var FormData = require("form-data");
const serviceUrl = `http://e83d-103-109-40-10.ngrok.io/predict`;

export default async function handler(req, res) {
  const { url = "" } = req.body;
  var config = {};
  var data = new FormData();
  data.append("url", url);
  config = {
    method: "post",
    url: serviceUrl,
    headers: {
      ...data.getHeaders(),
    },
    data: data,
  };

  Axios(config)
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
