import Axios from "axios";

export async function postAsync(url, data) {
  try {
    const response = await Axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Origin': '*'
      },
    });
    return response;
  } catch (ex) {
    console.error(ex);
  }
}
