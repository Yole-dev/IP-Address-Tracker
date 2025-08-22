import Header from "./components/Header";
import Main from "./components/Main";
import Map from "./components/Map";
import { TrackerProvider } from "./contexts/TrackerContext";

export default function App() {
  return (
    <div className="relative w-full font-display">
      <Header />

      <TrackerProvider>
        <Main />
        <Map />
      </TrackerProvider>
    </div>
  );
}
