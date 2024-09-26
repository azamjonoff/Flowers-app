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
    imgUrl: "Flower image was not uploaded",
    name: "Enter the flower's name",
    price: "Enter the flower's price",
    summary: "A description of the flower is required",
    smell: "Flower's scent was not selected",
    category: "Select a category for the flower",
    country: "Country was not selected",
    lifetime: "Flower's blooming time was not entered",
    color: "A color for the flower was not selected",
  };

  let checker = false;
  let errorMessage = "";
  for (const key in obj) {
    if (obj[key].trim() === "") {
      checker = true;
      errorMessage = errors[key];
    }
  }

  return { checker, errorMessage };
};

export function findObj(array, id) {
  return array.find((element) => element.id == id);
}

export const baseUrl = "https://json-api.uz/api/project/flowers-with-admin";
export const allowImageSize = 5_242_880;
export const summaryLimit = 200;
export const limit = 10;
