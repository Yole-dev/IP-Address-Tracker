import ResultsBar from "./ResultsBar";
import SearchBar from "./SearchBar";

export default function Main() {
  return (
    <div className="absolute top-[1.5rem] z-10 w-full flex flex-col items-center gap-[1rem] ">
      <h1 className="text-heading text-[25px] text-white">
        IP Address Tracker
      </h1>
      <SearchBar />
      <ResultsBar />
    </div>
  );
}
