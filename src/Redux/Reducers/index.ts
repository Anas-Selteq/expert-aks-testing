import { getCookie, setCookie } from "@/utils/utils";
import { AUTH_ACTIONS } from "../Actions/loginPageAction";

const Auth_default_state = {
  loading: false,
  profile: {},
  isLoggedIn: false,
  bookingDetail:null,
};

export const authReducer = (state = Auth_default_state, action: ActionI) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_ACTIONS.LOGIN_REQUEST:
      return { ...state, loading: true };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      // const updatedProfile = { ...state.profile, imageURL: payload.imageURL };
      // setCookie("profile", JSON.stringify(updatedProfile));
      // return { ...state, loading: false, profile: updatedProfile, isLoggedIn: true };
      setCookie("profile", JSON.stringify(payload));
      return { ...state, loading: false, profile: payload, isLoggedIn: true };

    case AUTH_ACTIONS.LOGIN_FAILED:
      return { ...state, loading: false, message: payload };

    case AUTH_ACTIONS.SET_PROFILE:
      return { ...state, profile: payload,isLoggedIn:true };

    case AUTH_ACTIONS.LOGOUT:
      return { ...state, profile: null, isLoggedIn: false };
      case AUTH_ACTIONS.BOOKING_DETAILS:
        return { ...state, loading: false, bookingDetail:payload , isLoggedIn: true  };

    case AUTH_ACTIONS.SET_NAMES_BASIC_INFO:
      let newState = {
        ...state,
        loading: false,
        profile: {
          ...state.profile,
          ...payload,
        },
        message: "",
      };
      setCookie("profile", JSON.stringify(newState.profile));
      return newState;

    case AUTH_ACTIONS.ADD_GENDER:
      let _newState = {
        ...state,
        loading: false,
        profile: {
          ...state.profile,
          ...payload,
        },
        message: "",
      };
      setCookie("profile", JSON.stringify(_newState.profile));
      return _newState;

    case AUTH_ACTIONS.ADD_DOB: {
      let _newState = {
        ...state,
        loading: false,
        profile: {
          ...state.profile,
          ...payload,
        },
        message: "",
      };
      setCookie("profile", JSON.stringify(_newState.profile));
      return _newState;
    }

    case AUTH_ACTIONS.UPDATE_PRIMARY_EMAIL: {
      let _newState = {
        ...state,
        loading: false,
        profile: {
          ...state.profile,
          ...payload,
        },
        message: "",
      };
      setCookie("profile", JSON.stringify(_newState.profile));
      return _newState;
    }

    case AUTH_ACTIONS.UPDATE_SECONDARY_MOBILE: {
      let _newState = {
        ...state,
        loading: false,
        profile: {
          ...state.profile,
          ...payload,
        },
        message: "",
      };
      setCookie("profile", JSON.stringify(_newState.profile));
      return _newState;
    }
    case AUTH_ACTIONS.UPDATE_SECONDARY_EMAIL: {
      let _newState = {
        ...state,
        loading: false,
        profile: {
          ...state.profile,
          ...payload,
        },
        message: "",
      };
      setCookie("profile", JSON.stringify(_newState.profile));
      return _newState;
    }
    case AUTH_ACTIONS.SECONDARY_EMAIL_ADD: {
      let _newState = {
        ...state,
        loading: false,
        profile: {
          ...state.profile,
          ...payload,
        },
        message: "",
      };
      setCookie("profile", JSON.stringify(_newState.profile));
      return _newState;
    }
    case AUTH_ACTIONS.SECONDARY_MOBILE_ADD: {
      let _newState = {
        ...state,
        loading: false,
        profile: {
          ...state.profile,
          ...payload,
        },
        message: "",
      };
      setCookie("profile", JSON.stringify(_newState.profile));
      return _newState;
    }
    default:
      return state;
  }
};

interface ActionI {
  payload: any;
  type: string;
}
