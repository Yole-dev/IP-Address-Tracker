import ResultsBar from "./ResultsBar";
import SearchBar from "./SearchBar";

export default function Main() {
  return (
    <div className="absolute top-[2rem] z-10 w-full flex flex-col items-center gap-[1rem] ">
      <h1 className="text-heading">IP Address Tracker</h1>
      <SearchBar />
      <ResultsBar />
    </div>
  );
}
