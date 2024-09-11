export function getFormData(form) {
  const data = new FormData(form);
  const myObj = {};
  for (const [key, value] of data.entries()) {
    myObj[key] = value;
  }

  return myObj;
}

export const baseUrl = "https://json-api.uz/api/project/flowers-with-admin";
