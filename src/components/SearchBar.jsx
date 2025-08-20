import { useTracker } from "../contexts/TrackerContext";

import rightArrowIcon from "../assets/images/icon-arrow.svg";

export default function SearchBar() {
  const { queryString, searchIpAddressInfo, dispatch } = useTracker();

  function handleSearch(e) {
    e.preventDefault();
    searchIpAddressInfo(queryString);
  }

  return (
    <div className="flex justify-center items-center w-[90%] lg:w-[35%]">
      <input
        type="text"
        value={queryString}
        placeholder="Search for any IP address or domain"
        onChange={(e) => {
          dispatch({
            type: "searchIPAddress",
            payload: e.target.value,
          });
        }}
        className="h-[55px] w-[85%] text-body text-dark-gray indent-[1.5rem] bg-white rounded-s-[1rem] focus:outline-0 lg:w-[87%] lg:h-[80px] lg:text-[18px] lg:rounded-e-[1.5rem]"
      />
      <button
        onClick={handleSearch}
        className="h-[55px] w-[15%] flex items-center justify-center rounded-e-[1rem] text-white bg-dark-gray lg:w-[13%] lg:h-[80px] lg:rounded-e-[1.5rem] "
      >
        <img
          src={rightArrowIcon}
          alt="right arrow icon"
          className="lg:w-[15px]"
        />
      </button>
    </div>
  );
}
