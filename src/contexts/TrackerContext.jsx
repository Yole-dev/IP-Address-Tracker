import { createContext, useContext, useReducer } from "react";

const TrackerContext = createContext();

const initialState = {
  queryString: "input an IP Address or a Domain",
};

function reducer(state, action) {
  switch (action.type) {
    case "searchIP":
      return {
        ...state,
      };

    default:
      throw new Error("Unknown action");
  }
}

function TrackerProvider({ children }) {
  const [{ queryString }, dispatch] = useReducer(reducer, initialState);
  return (
    <TrackerContext
      value={{
        queryString,
        dispatch,
      }}
    >
      {children}
    </TrackerContext>
  );
}

function useTracker() {
  const context = useContext();
  if (!context) throw new Error("TrackerContext was used outside the context");
  return context;
}

export { TrackerProvider, useTracker };
