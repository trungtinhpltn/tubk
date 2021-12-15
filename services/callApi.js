import { postAsync } from "./request";

const serviceUrl = `http://a0ee-103-109-40-10.ngrok.io/predict`;

export async function sendImage(data) {
  return postAsync(serviceUrl, data);
}
