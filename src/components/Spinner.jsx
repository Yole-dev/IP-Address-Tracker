import { LoaderCircle } from "lucide-react";

export default function Spinner() {
  return (
    <div className="animate-spin">
      <LoaderCircle className="text-light-gray" size={50} />
    </div>
  );
}
