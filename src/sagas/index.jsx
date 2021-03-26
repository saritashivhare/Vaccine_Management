import { put, takeLatest, all } from "redux-saga/effects";

const url = "http://localhost:3000/";
const devapi = {
  validateUser: url + "users/validateUser",
  getRegisteredUserList: url + "registereduserdetails/getRegisteredUserList",
  submitRegisteredUser: url + "registereduserdetails/submitRegisteredUser",
  registerBankByAdmin: url + "admindetails/registerBankByAdmin",
  submitBankDetailsByUser:
    url + "registereduserdetails/submitBankDetailsByUser",
  getRegisteredUsersBankList:
    url + "registereduserdetails/getRegisteredUsersBankList",
  getMasterBankList: url + "registereduserdetails/getMasterBankList",
  submitRegisteredBankAdmin: url + "admindetails/submitRegisteredBankAdmin",
  getBankSpecificUserList: url + "dashboard/getBankSpecificUserList",
  submitTransferMoneyDetails: url + "virusdetails/submitTransferMoneyDetails",
  getBalence: url + "virusdetails/getBalence",
  getAccounts: url + "virusdetails/getAccounts",
  searchAccount: url + "virusdetails/searchAccount",
  forgetPassword: url + "users/forgetPassword",
  checkPasswordDate: url + "users/checkPasswordDate",
  resetPassword: url + "users/resetPassword",
  payment: url + "payment/payment",
  callback: url + "callback/callback",

  getVirus: url + "virusdetails/getVirus",
  getCompany: url + "registereduserdetails/getCompany",
  getSports: url + "virusdetails/getSports",
  getState: url + "registereduserdetails/getState",

  getCountry: url + "registereduserdetails/getCountry",
  getMysport: url + "virusdetails/getMysport",
  getSpetialization: url + "virusdetails/getSpetialization",

  getVcount: url + "VirusDetails/getVcount",
  getList: url + "VirusDetails/getList",
  Paymentmail: url + "VirusDetails/Paymentmail",
};

function* checkLoginDetails(action) {
  const json = yield fetch(devapi.validateUser, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "LOGIN_DETAILS_RECEIVED", json: json });
}

function* submitRegisteredUser(action) {
  const json = yield fetch(devapi.submitRegisteredUser, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "SUBMITTED_REGISTERED_USER_DETAILS_SUCCESS", json: json });
}

function* registerBankByAdmin(action) {
  const json = yield fetch(devapi.registerBankByAdmin, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "REGISTERED_BANK_BY_ADMIN_SUCCESS", json: json });
}

function* getRegisteredUserList(action) {
  const json = yield fetch(devapi.getRegisteredUserList, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "GET_REGISTERED_USER_LIST_SUCCESS", json: json });
}

function* submitBankDetailsByUser(action) {
  const json = yield fetch(devapi.submitBankDetailsByUser, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "SUBMIT_USER_BANK_DETAILS_SUCCESS", json: json });
}

function* getRegisteredUsersBankList(action) {
  const json = yield fetch(devapi.getRegisteredUsersBankList, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "GET_USER_BANK_SUCCESS", json: json });
}

function* getMasterBankList(action) {
  const json = yield fetch(devapi.getMasterBankList, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "MASTER_BANK_LIST_SUCCESS", json: json });
}

function* submitRegisteredBankAdmin(action) {
  const json = yield fetch(devapi.submitRegisteredBankAdmin, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "SUBMITTED_BANK_ADMIN_DETAILS_SUCCESS", json: json });
}

function* getBankSpecificUserList(action) {
  const json = yield fetch(devapi.getBankSpecificUserList, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "BANK_SPECIFIC_USER_LIST_SUCCESS", json: json });
}

function* submitTransferMoneyDetails(action) {
  const json = yield fetch(devapi.submitTransferMoneyDetails, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "submitTransferMoneyDetails_SUCCESS", json: json });
}

function* getBalence(action) {
  const json = yield fetch(devapi.getBalence, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "getBalenceSucsses", json: json });
}

function* getAccounts(action) {
  const json = yield fetch(devapi.getAccounts, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "getAccountsSucsses", json: json });
}

function* searchAccount(action) {
  const json = yield fetch(devapi.searchAccount, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "searchAccountSucsses", json: json });
}

function* forgetPassword(action) {
  const json = yield fetch(devapi.forgetPassword, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "forgetPasswordSucsses", json: json });
}

function* checkPasswordDate(action) {
  const json = yield fetch(devapi.checkPasswordDate, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "checkPasswordDateSucsses", json: json });
}

function* resetPassword(action) {
  const json = yield fetch(devapi.resetPassword, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "resetPasswordSucsses", json: json });
}

function* logout() {
  yield put({ type: "LOGOUT_SUCCESS" });
}

function* getVirus(action) {
  const json = yield fetch(devapi.getVirus, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "getVirussuccess", json: json });
}

function* getSports(action) {
  const json = yield fetch(devapi.getSports, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "getSportsSucsses", json: json });
}

function* getMysport(action) {
  const json = yield fetch(devapi.getMysport, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "getMysportSuccess", json: json });
}

function* getState(action) {
  const json = yield fetch(devapi.getState, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "getstatesucces", json: json });
}

function* getCountry(action) {
  const json = yield fetch(devapi.getCountry, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "getcountrysuccess", json: json });
}

function* getSpetialization(action) {
  const json = yield fetch(devapi.getSpetialization, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "getSpetializationSucsses", json: json });
}

function* payment(action) {
  const json = yield fetch(devapi.payment, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "paymentParams", json: json });
}

function* callback(action) {
  const json = yield fetch(devapi.callback, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "paymentStatus", json: json });
}

function* getCompany(action) {
  const json = yield fetch(devapi.getCompany, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "getcompanysuccess", json: json });
}

function* getVcount(action) {
  const json = yield fetch(devapi.getVcount, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "getVcountsuccess", json: json });
}

function* getList(action) {
  const json = yield fetch(devapi.getList, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "getListsuccess", json: json });
}

function* Paymentmail(action) {
  const json = yield fetch(devapi.Paymentmail, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: action.token,
    },
    body: JSON.stringify(action.data),
  }).then((response) => response.json());
  yield put({ type: "Paymentmailsuccess", json: json });
}

function* actionWatcher() {
  yield takeLatest("CHECK_LOGIN_DETAILS", checkLoginDetails);
  yield takeLatest("GET_REGISTERED_USER_LIST", getRegisteredUserList);
  yield takeLatest("SUBMIT_REGISTERED_USER", submitRegisteredUser);
  yield takeLatest("REGISTER_BANK_BY_ADMIN", registerBankByAdmin);
  yield takeLatest("SUBMIT_USER_BANK_DETAILS", submitBankDetailsByUser);
  yield takeLatest("USER_BANK_LIST", getRegisteredUsersBankList);
  yield takeLatest("MASTER_BANK_LIST", getMasterBankList);
  yield takeLatest("SUBMIT_BANK_ADMIN_DETAILS", submitRegisteredBankAdmin);
  yield takeLatest("BANK_SPECIFIC_USER_LIST", getBankSpecificUserList);
  yield takeLatest("submitTransferMoneyDetails", submitTransferMoneyDetails);
  yield takeLatest("getBalence", getBalence);
  yield takeLatest("getAccounts", getAccounts);
  yield takeLatest("searchAccount", searchAccount);
  yield takeLatest("forgetPassword", forgetPassword);
  yield takeLatest("checkPasswordDate", checkPasswordDate);
  yield takeLatest("resetPassword", resetPassword);

  yield takeLatest("payment", payment);
  yield takeLatest("callback", callback);

  yield takeLatest("getVirus", getVirus);
  yield takeLatest("getSports", getSports);
  yield takeLatest("getMysport", getMysport);

  yield takeLatest("getState", getState);
  yield takeLatest("getCountry", getCountry);
  yield takeLatest("getSpetialization", getSpetialization);

  yield takeLatest("logout", logout);

  yield takeLatest("getCompany", getCompany);
  yield takeLatest("getVcount", getVcount);
  yield takeLatest("getList", getList);
  yield takeLatest("Paymentmail", Paymentmail);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
