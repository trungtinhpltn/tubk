import Axios from "axios";

export async function postAsync(url, data) {
  try {
    const response = await Axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data;",
      },
    });
    return response;
  } catch (ex) {
    console.error(ex);
  }
}
