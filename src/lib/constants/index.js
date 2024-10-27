const baseUrl = "https://json-api.uz/api/project/flowers",
  needStatisticReport = ["category", "country", "color"],
  allowImageSize = 5_242_880,
  summaryLimit = 200,
  limit = 10,
  errorMessages = {
    somethingWentWrong: "Something went wrong",
    passwordOrUsernameWrong: "Username or password is not correct",
  },
  successMessages = {
    dataAddedSucc: "Data added successfully.",
    dataEditedSucc: "Data edited successfully.",
    dataDeletedSucc: "Data deleted successfully.",
    addedAdmin: "Admin added successfully",
    deletedAdmin: "Admin deleted successfully",
    editedAdmin: "Admin edited successfully",
  };

export {
  allowImageSize,
  baseUrl,
  errorMessages,
  limit,
  needStatisticReport,
  successMessages,
  summaryLimit,
};
