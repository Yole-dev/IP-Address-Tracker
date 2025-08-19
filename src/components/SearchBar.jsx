import { useTracker } from "../contexts/TrackerContext";

import rightArrowIcon from "../assets/images/icon-arrow.svg";

export default function SearchBar() {
  const { queryString, searchIpAddressInfo, dispatch } = useTracker();

  function handleSearch(e) {
    e.preventDefault();
    searchIpAddressInfo(queryString);
  }

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
        className="h-[55px] w-[85%] text-body text-dark-gray bg-white rounded-s-[0.8rem] ps-[1rem] "
      />
      <button
        onClick={handleSearch}
        className="h-[55px] w-[15%] flex items-center justify-center rounded-e-[0.8rem] text-white bg-dark-gray "
      >
        <img src={rightArrowIcon} alt="right arrow icon" />
      </button>
    </div>
  );
}
