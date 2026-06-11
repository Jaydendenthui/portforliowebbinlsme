import { useParams } from "react-router";
import TiemBanh from "../projects/TiemBanh";
import Lusine from "../projects/Lusine";
// import other projects here

export default function WorkDetail() {
  const { id } = useParams();

  const projectMap: Record<string, JSX.Element> = {
    "tiembanh": <TiemBanh />,
    "lusine-fb": <Lusine />,
    // add more here
  };

  return projectMap[id as string] || <div>Project not found</div>;
}