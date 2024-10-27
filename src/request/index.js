// lib
import { baseUrl, errorMessages, successMessages } from "../lib/constants";

// refresh-token
async function refreshToken() {
  const refresh_token = JSON.parse(localStorage.getItem("admin")).refresh_token;
  const res = await fetch(baseUrl + "/auth/refresh-token", {
    method: "POST",
    body: JSON.stringify({ refresh_token }),
  });

  if (res.status === 200 || res.status === 201) return await res.json();
  if (res.status === 403) throw new Error(403);
  else throw new Error(errorMessages.somethingWentWrong);
}

// admin post
async function postData(data) {
  const res = await fetch(baseUrl + "/auth/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.status === 400)
    throw new Error(errorMessages.passwordOrUsernameWrong);
  if (res.status === 200 || res.status === 201) return await res.json();
  else throw new Error(errorMessages.somethingWentWrong);
}

// flowers
async function getFlowers(token, { skip, limit }, isFiltered) {
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
  else throw new Error(errorMessages.somethingWentWrong);
}

// image local
async function uploadImage(image) {
  const formData = new FormData();
  formData.append("file", image);
  const res = await fetch(baseUrl + "/upload", {
    method: "POST",
    body: formData,
  });

  if (res.status === 200 || res.status === 201) return res.text();
  else throw new Error(errorMessages.somethingWentWrong);
}

// send flower
async function sendFlower(flower) {
  const token = JSON.parse(localStorage.getItem("admin")).access_token;
  const res = await fetch(baseUrl + "/flowers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(flower),
  });

  if (res.status === 200 || res.status === 201)
    return successMessages.dataAddedSucc;
  if (res.status === 403) throw new Error("403");
  else throw new Error(errorMessages.somethingWentWrong);
}

// delete flower
async function deleteFlower(id) {
  const token = JSON.parse(localStorage.getItem("admin")).access_token;
  const res = await fetch(baseUrl + `/flowers/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 200 || res.status === 201)
    return successMessages.dataDeletedSucc;
  if (res.status === 403) throw new Error("403");
  else throw new Error(errorMessages.somethingWentWrong);
}

// edit flower
async function editFlower(flower) {
  const token = JSON.parse(localStorage.getItem("admin")).access_token;
  const res = await fetch(baseUrl + `/flowers/${flower.id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(flower),
  });

  if (res.status === 200 || res.status === 201)
    return successMessages.dataEditedSucc;
  if (res.status === 403) throw new Error("403");
  else throw new Error(errorMessages.somethingWentWrong);
}

// get statistics
async function getStatistics() {
  const res = await fetch(baseUrl + `/flowers`);

  if (res.status === 200 || res.status === 201) return await res.json();
  else throw new Error(errorMessages.somethingWentWrong);
}

// get admins
async function getAdmins() {
  const token = JSON.parse(localStorage.getItem("admin")).access_token;
  const res = await fetch(baseUrl + `/users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 403) throw new Error("403");
  if (res.status === 200 || res.status === 201) return await res.json();
  else throw new Error(errorMessages.somethingWentWrong);
}

// edit admin
async function editAdmin(admin) {
  const token = JSON.parse(localStorage.getItem("admin")).access_token;
  const res = await fetch(baseUrl + `/users/${admin.id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(admin),
  });

  if (res.status === 200 || res.status === 201)
    return successMessages.editedAdmin;
  if (res.status === 403) throw new Error("403");
  else throw new Error(errorMessages.somethingWentWrong);
}

// add admin
async function addAdmin(admin) {
  const token = JSON.parse(localStorage.getItem("admin")).access_token;
  const res = await fetch(baseUrl + "/users", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(admin),
  });

  if (res.status === 200 || res.status === 201)
    return successMessages.addedAdmin;
  if (res.status === 403) throw new Error("403");
  else throw new Error(errorMessages.somethingWentWrong);
}

// delete admin
async function deleteAdmin(id) {
  const token = JSON.parse(localStorage.getItem("admin")).access_token;
  const res = await fetch(baseUrl + `/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 200 || res.status === 201)
    return successMessages.deletedAdmin;
  if (res.status === 403) throw new Error("403");
  else throw new Error(errorMessages.somethingWentWrong);
}

export {
  addAdmin,
  deleteAdmin,
  deleteFlower,
  editAdmin,
  editFlower,
  getAdmins,
  getFlowers,
  getStatistics,
  postData,
  refreshToken,
  sendFlower,
  uploadImage,
};
