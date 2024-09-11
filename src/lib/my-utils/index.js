export function getFormData(form) {
  const data = new FormData(form);
  const myObj = {};
  for (const [key, value] of data.entries()) {
    myObj[key] = value;
  }

  return myObj;
}

export const collectCategory = (categories) => {
  const result = [];
  for (const { category } of categories) {
    result.push(category);
  }
  return Array.from(new Set(result));
};

export const baseUrl = "https://json-api.uz/api/project/flowers-with-admin";
