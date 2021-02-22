import { render } from "react-dom";
import { TreeRoot } from "./tree/tree-root";
import "./index.css";

render(<TreeRoot />, document.body.appendChild(document.createElement("div")));
