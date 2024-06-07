import "./styles.css";
import './index.css';
import { createRoot } from "react-dom/client";
import Experience from "./Experience";

const root = createRoot(document.getElementById("root"));

root.render(
  <>
      <Experience />
  </>
);
