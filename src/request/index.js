// lib
import { baseUrl } from "../lib/utils";

export async function postData(data) {
  const res = await fetch(baseUrl + "/auth/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.status === 200 || res.status === 201) return await res.json();
  if (res.status === 400)
    throw new Error("Username or password is not correct");
  else throw new Error("Something went wrong");
}
