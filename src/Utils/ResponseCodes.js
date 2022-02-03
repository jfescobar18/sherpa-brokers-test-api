var ResponseCodes = {}

ResponseCodes.AdminAuthenticated = { name: "AdminAuthenticated", code: 1 };
ResponseCodes.InvalidCredentials = { name: "InvalidCredentials", code: 2 };
ResponseCodes.AdminEdited = { name: "AdminEdited", code: 3 };
ResponseCodes.AdminDeleted = { name: "AdminDeleted", code: 4 };
ResponseCodes.CategoryEdited = { name: "CategoryEdited", code: 5 };
ResponseCodes.CategoryDeleted = { name: "CategoryDeleted", code: 6 };
ResponseCodes.AuthHeaderMissed = { name: "AuthHeaderMissed", code: 90 };
ResponseCodes.ExpiredToken = { name: "ExpiredToken", code: 91 };
ResponseCodes.InvalidToken = { name: "InvalidToken", code: 92 };
ResponseCodes.Unexpected = { name: "Unexpected", code: 99 };

module.exports = ResponseCodes;