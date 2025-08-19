import { useTracker } from "../contexts/TrackerContext";

export default function SearchBar() {
  const { queryString, dispatch } = useTracker();
  return (
    <div className="flex justify-center items-center w-[90%] lg:w-[50%]">
      <input
        type="text"
        value={queryString}
        placeholder="Input an IP Address"
        onChange={(e) => {
          dispatch({
            type: "searchIPAddress",
            payload: e.target.value,
          });
        }}
      />
      <button>search</button>
    </div>
  );
}
