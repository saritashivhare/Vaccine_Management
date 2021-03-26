const INITIAL_STATE = {};
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_DETAILS_RECEIVED":
      return { ...state, loginDetails: action.json, loading: false };
    case "SUBMITTED_REGISTERED_USER_DETAILS_SUCCESS":
      return { ...state, registeredUserDetails: action.json, loading: false };
    case "REGISTERED_BANK_BY_ADMIN_SUCCESS":
      return {
        ...state,
        registeredBankDetailsByAdmin: action.json,
        loading: false,
      };
    case "GET_REGISTERED_USER_LIST_SUCCESS":
      return { ...state, registeredUserList: action.json, loading: false };
    case "SUBMIT_USER_BANK_DETAILS_SUCCESS":
      return {
        ...state,
        submittedBankDetailsByUser: action.json,
        loading: false,
      };
    case "GET_USER_BANK_SUCCESS":
      return { ...state, userBankList: action.json, loading: false };
    case "MASTER_BANK_LIST_SUCCESS":
      return { ...state, masterBankList: action.json, loading: false };
    case "SUBMITTED_BANK_ADMIN_DETAILS_SUCCESS":
      return {
        ...state,
        registeredBankAdminDetails: action.json,
        loading: false,
      };
    case "BANK_SPECIFIC_USER_LIST_SUCCESS":
      return {
        ...state,
        bankSpecificUserListSucsses: action.json,
        loading: false,
      };
    case "DOWNLOAD_REGISTERED_CUSTOMER_LIST_SUCCESS":
      return {
        ...state,
        downloadedRegisteredCustomerList: action.json,
        loading: false,
      };
    case "submitTransferMoneyDetails_SUCCESS":
      return {
        ...state,
        submitTransferMoneyDetails_SUCCESS: action.json,
        loading: false,
      };
    case "getBalenceSucsses":
      return { ...state, getBalenceSucsses: action.json, loading: false };
    case "getAccountsSucsses":
      return { ...state, getAccountsSucsses: action.json, loading: false };
    case "searchAccountSucsses":
      return { ...state, searchAccountSucsses: action.json, loading: false };
    case "forgetPasswordSucsses":
      return { ...state, forgetPasswordSucsses: action.json, loading: false };
    case "checkPasswordDateSucsses":
      return {
        ...state,
        checkPasswordDateSucsses: action.json,
        loading: false,
      };
    case "resetPasswordSucsses":
      return { ...state, resetPasswordSucsses: action.json, loading: false };
    case "getHomeDetailsSucsses":
      return { ...state, getHomeDetailsSucsses: action.json, loading: false };

    case "getVirussuccess":
      return { ...state, getVirussuccess: action.json, loading: false };

    case "getcompanysuccess":
      return { ...state, getcompanysuccess: action.json, loading: false };

    case "getSportsSucsses":
      return { ...state, getSportsSucsses: action.json, loading: false };

    case "getMysportSuccess":
      return { ...state, getMysportSuccess: action.json, loading: false };

    case "getstatesucces":
      return { ...state, getstatesucces: action.json, loading: false };

    case "getVcountsuccess":
      return { ...state, getVcountsuccess: action.json, loading: false };

    case "getListsuccess":
      return { ...state, getListsuccess: action.json, loading: false };

    case "Paymentmailsuccess":
      return { ...state, Paymentmailsuccess: action.json, loading: false };

    case "getcountrysuccess":
      return { ...state, getcountrysuccess: action.json, loading: false };
    case "getSpetializationSucsses":
      return {
        ...state,
        getSpetializationSucsses: action.json,
        loading: false,
      };
    case "paymentParams":
      return { ...state, paymentParams: action.json, loading: false };
    case "paymentStatus":
      return { ...state, paymentStatus: action.json, loading: false };

    case "LOGOUT_SUCCESS":
      return { INITIAL_STATE, loading: false };

    default:
      if (state != INITIAL_STATE) {
        return { state, loading: true };
      }
      return state;
  }
};

export default reducer;
