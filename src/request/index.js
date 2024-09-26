// lib
import { baseUrl } from "../lib/my-utils";

// refresh-token
export async function refreshToken(token) {
  const res = await fetch(baseUrl + "/auth/refresh-token", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ refresh_token: token }),
  });

  if (res.status === 200 || res.status === 201) return await res.json();
  if (res.status === 403) throw new Error(403);
}

// admin post
export async function postData(data) {
  const res = await fetch(baseUrl + "/auth/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.status === 400)
    throw new Error("Username or password is not correct");
  if (res.status === 200 || res.status === 201) return await res.json();
  else throw new Error("Something went wrong");
}

// flowers
export async function getFlowers(token, { skip, limit }, isFiltered) {
  const query = new URLSearchParams(`skip=${skip}&limit=${limit}`);

  if (isFiltered) {
    for (const key in isFiltered) {
      if (isFiltered[key]) {
        query.append(key, isFiltered[key]);
      }
    }
  }

  const res = await fetch(baseUrl + "/flowers?" + query, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 403) throw new Error(403);
  if (res.status === 200 || res.status === 201) return await res.json();
  else throw new Error("Something went wrong");
}

// image local
export async function uploadImage(image) {
  const formData = new FormData();
  formData.append("file", image);
  const res = await fetch(baseUrl + "/upload", {
    method: "POST",
    body: formData,
  });

  if (res.status === 200 || res.status === 201) return res.text();
  else throw new Error("Something went wrong");
}

// send flower
export async function sendFlower(token, flower) {
  const res = await fetch(baseUrl + "/flowers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(flower),
  });

  if (res.status === 200 || res.status === 201)
    return "Data added successfully.";
  if (res.status === 403) throw new Error("403");
  else throw new Error("Something went wrong");
}

// delete flower
export async function deleteFlower(token, id) {
  const res = await fetch(baseUrl + `/flowers/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 200 || res.status === 201)
    return "Data deleted successfully.";
  if (res.status === 403) throw new Error("403");
  else throw new Error("Something went wrong");
}

// edit flower
export async function editFlower(token, flower) {
  const res = await fetch(baseUrl + `/flowers/${flower.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(flower),
  });

  if (res.status === 200 || res.status === 201)
    return "Data edited successfully.";
  if (res.status === 403) throw new Error("403");
  else throw new Error("Something went wrong");
}
