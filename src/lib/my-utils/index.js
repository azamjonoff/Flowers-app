export function getFormData(form) {
  const data = new FormData(form);
  const myObj = {};
  for (const [key, value] of data.entries()) {
    myObj[key] = value;
  }

  return myObj;
}

export const collectItem = (array, item) => {
  const result = [];
  for (const obj of array) {
    result.push(obj[item]);
  }
  return Array.from(new Set(result));
};

export const validation = (obj) => {
  const errors = {
    imgUrl: "Flower image failed to upload",
    name: "Rose",
    price: 12.99,
    summary: "A classic symbol of love.",
    smell: "Sweet",
    category: "Blooming",
    country: "France",
    lifetime: "1 week",
    color: "#FF0000",
  };
  let checker = false;
  let errorMessage = "";
  for (const key in obj) {
    if (obj[key].trim() === "") {
      checker = true;
      errorMessage = key;
    }
  }

  return { checker, errorMessage };
};

export const baseUrl = "https://json-api.uz/api/project/flowers-with-admin";
export const periods = ["kun", "oy", "yil"];
export const allowImageSize = 5_242_880;
