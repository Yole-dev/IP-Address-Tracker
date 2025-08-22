import ResultsBar from "./ResultsBar";
import SearchBar from "./SearchBar";

export default function Main() {
  return (
    <div className="absolute top-[2rem] z-10 w-full flex flex-col items-center gap-[1.5rem] lg:top-[12rem] lg:gap-[2rem] xl:top-[1rem] xl:gap-[1.3rem] 2xl:top-[3.5rem] 2xl:gap-[2.5rem] ">
      <p className="text-heading text-[25px] text-white lg:text-[40px] ">
        IP Address Tracker
      </p>
      <SearchBar />
      <ResultsBar />
    </div>
  );
}
