import { useTracker } from "../contexts/TrackerContext";
import Spinner from "./Spinner";

export default function ResultsBar() {
  const { ipAddressData, isLoading, error } = useTracker();
  console.log(ipAddressData);
  return (
    <div className="w-[90%] h-[370px] flex items-center justify-center lg:w-[60%] lg:h-[150px] bg-white rounded-[1rem]">
      {(isLoading || !ipAddressData) && <Spinner />}

      {!isLoading && ipAddressData && (
        <ResultsBarContent ipAddressData={ipAddressData} />
      )}

      {!isLoading && !ipAddressData && "No Data Available"}
    </div>
  );
}

function ResultsBarContent({ ipAddressData }) {
  const { ip, location, isp } = ipAddressData || {};
  const { region, city, timezone } = location || {};
  return (
    <div className=" flex flex-col items-center justify-center gap-[1rem] lg:w-full lg:flex-row lg:items-start lg:justify-around ">
      <IPinfo title="ip address" value={`${ip ? ip : "N/A"}`} />
      <IPinfo
        title="location"
        value={`${region ? region : "N/A"}, ${city ? city : "N/A"}`}
      />
      <IPinfo title="timezone" value={`${timezone ? timezone : "N/A"}`} />
      <IPinfo title="isp" value={`${isp ? isp : "N/A"}`} />
    </div>
  );
}

function IPinfo({ title, value }) {
  return (
    <div className="flex flex-col items-center gap-[0.1rem] text-center lg:items-start lg:text-left lg:gap-[0.7rem]">
      <p className="uppercase text-body text-light-gray text-[14px] font-[500] lg:text-[16px] ">
        {title}
      </p>
      <p className="w-[90%] text-heading text-dark-gray ">{value}</p>
    </div>
  );
}
