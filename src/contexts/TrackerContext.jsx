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
        queryString: action.payload,
        userIpAddress: action.payload,
        isLoading: false,
      };

    case "fetchUserIPAddressInfo":
      return {
        ...state,
        ipAddressData: action.payload,
      };

    case "fetchSearchedIPAddressInfo":
      return {
        ...state,
        ipAddressData: action.payload,
      };

    case "searchIPAddress":
      return {
        ...state,
      };

    case "loading":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "error":
      return {
        ...state,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action");
  }
}

function TrackerProvider({ children }) {
  const [
    { queryString, userIpAddress, ipAddressData, isLoading, error },
    dispatch,
  ] = useReducer(reducer, initialState);

  // Effect fetching User's IP Address

  useEffect(() => {
    async function getUserIpAddress() {
      dispatch({ type: "loading", payload: true });
      try {
        const res = await fetch(`${API_URL}`);
        const data = await res.json();
        console.log(data.ip);

        dispatch({
          type: "fetchUserIPAddress",
          payload: data.ip,
        });
      } catch {
        dispatch({
          type: "error",
          payload: "An error occured getting the users IP Address",
        });
      }
    }
    getUserIpAddress();
  }, []);

  // Effect fetching User's IP Address Data.

  useEffect(() => {
    async function getUserIpAddressInfo() {
      try {
        const res = await fetch(
          `${BASE_URL}${API_KEY}&ipAddress=${userIpAddress}`
        );
        const data = await res.json();

        console.log(data);

        dispatch({
          type: "fetchUserIPAddressInfo",
          payload: data,
        });
      } catch {
        dispatch({
          type: "error",
          payload: "An error occured getting the users IP Address",
        });
      }
    }

    getUserIpAddressInfo();
  }, [userIpAddress]);

  //   Effect fetching searched IP Address or Domain Data

  useEffect(() => {
    async function searchIpAddressInfo() {
      try {
        const res = await fetch(
          `${BASE_URL}${API_KEY}&ipAddress=${queryString}`
        );
        const data = await res.json();

        console.log(data);

        dispatch({
          type: "fetchSearchedIPAddressInfo",
          payload: data,
        });
      } catch {
        dispatch({
          type: "error",
          payload: "An error occured getting the users IP Address",
        });
      }
    }

    searchIpAddressInfo();
  }, [queryString]);

  return (
    <TrackerContext.Provider
      value={{
        queryString,
        userIpAddress,
        ipAddressData,
        isLoading,
        error,
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
