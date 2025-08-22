import { createContext, useContext, useEffect, useReducer } from "react";

const TrackerContext = createContext();

const API_URL = "https://api.ipify.org?format=json";
const BASE_URL = "https://geo.ipify.org/api/v2/country,city?apiKey=";
const API_KEY = import.meta.env.VITE_IPIFY_API_KEY;

const initialState = {
  queryString: "",
  ipAddressData: {},
  userIpAddress: "",
  lat: "",
  lng: "",
  isp: "",
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "fetchUserIPAddress":
      return {
        ...state,
        userIpAddress: action.payload,
        isLoading: false,
      };

    case "fetchUserIPAddressInfo":
      return {
        ...state,
        ipAddressData: action.payload,
        isLoading: false,
      };

    case "fetchSearchedIPAddressInfo":
      return {
        ...state,
        ipAddressData: action.payload,
      };

    case "searchIPAddress":
      return {
        ...state,
        queryString: action.payload,
      };

    case "loading":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "error":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action");
  }
}

function getErrorMessage(status) {
  switch (status) {
    case 400:
      return "Bad Request: Some required fields are missing or have invalid values.";
    case 401:
      return "Unauthorized: Missing or Invalid API key.";
    case 403:
      return "Access restricted: Check credits balance or API key validity.";
    case 422:
      return "Unprocessable Entity: Input correct request parameters or search term.";
    case 429:
      return "Too Many Requests. Try again later.";

    default:
      return "An unexpected error occurred.";
  }
}

function TrackerProvider({ children }) {
  const [
    { queryString, userIpAddress, ipAddressData, isLoading, error },
    dispatch,
  ] = useReducer(reducer, initialState);

  // Effect: Get user's IP
  useEffect(() => {
    async function getUserIpAddress() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Status: ${res.status}`);

        const data = await res.json();
        dispatch({
          type: "fetchUserIPAddress",
          payload: data.ip,
        });
      } catch (err) {
        const status = err.message.includes("Status")
          ? parseInt(err.message.split(":")[1])
          : null;
        dispatch({
          type: "error",
          payload: getErrorMessage(status),
        });
      }
    }

    getUserIpAddress();
  }, []);

  // Effect: Get IP info
  useEffect(() => {
    async function getUserIpAddressInfo() {
      dispatch({ type: "loading", payload: true });
      try {
        const res = await fetch(
          `${BASE_URL}${API_KEY}&ipAddress=${userIpAddress}`
        );
        if (!res.ok) throw new Error(`Status: ${res.status}`);

        const data = await res.json();
        console.log(data);

        dispatch({
          type: "fetchUserIPAddressInfo",
          payload: data,
        });
      } catch (err) {
        const status = err.message.includes("Status")
          ? parseInt(err.message.split(":")[1])
          : null;
        dispatch({
          type: "error",
          payload: getErrorMessage(status),
        });
      }
    }

    getUserIpAddressInfo();
  }, [userIpAddress]);

  // Manual search called in SearchBar component.
  async function searchIpAddressInfo(ip) {
    try {
      const res = await fetch(`${BASE_URL}${API_KEY}&ipAddress=${ip}`);
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      const data = await res.json();

      console.log(data);

      dispatch({
        type: "fetchSearchedIPAddressInfo",
        payload: data,
      });
    } catch (err) {
      const status = err.message.includes("Status")
        ? parseInt(err.message.split(":")[1])
        : null;
      dispatch({
        type: "error",
        payload: getErrorMessage(status),
      });
    }
  }

  return (
    <TrackerContext.Provider
      value={{
        queryString,
        userIpAddress,
        ipAddressData,
        isLoading,
        error,
        searchIpAddressInfo,
        dispatch,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}

function useTracker() {
  const context = useContext(TrackerContext);
  if (!context) throw new Error("TrackerContext was used outside the provider");
  return context;
}

export { TrackerProvider, useTracker };
