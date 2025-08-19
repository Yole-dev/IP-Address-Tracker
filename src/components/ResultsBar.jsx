import { useTracker } from "../contexts/TrackerContext";

export default function ResultsBar() {
  const ipAddressData = useTracker();
  console.log(ipAddressData);

  const { ip, location, isp } = ipAddressData;
  //   const { city, timezone } = location;

  return (
    <div className="w-[90%] h-[370px] flex flex-col items-center justify-center gap-[1rem] bg-white rounded-[1rem] lg:w-[60%] lg:h-[150px] lg:flex-row lg:justify-around ">
      <IPinfo title="ip address" value="--" />
      <IPinfo title="location" value="--" />
      <IPinfo title="timezone" value="--" />
      <IPinfo title="isp" value="--" />
    </div>
  );
}

function IPinfo({ title, value }) {
  return (
    <div className="flex flex-col gap-[0.3rem] text-center lg:text-left ">
      <p className="uppercase text-body text-light-gray ">{title}</p>
      <p className=" text-[25px] text-heading text-dark-gray ">{value}</p>
    </div>
  );
}
