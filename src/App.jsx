import Header from "./components/Header";
import Main from "./components/Main";
import Map from "./components/Map";
import { TrackerProvider } from "./contexts/TrackerContext";

export default function App() {
  return (
    <div className="w-full font-display">
      <TrackerProvider>
        <Header />
        <Map />
        <Main />
      </TrackerProvider>
    </div>
  );
}
