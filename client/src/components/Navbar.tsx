import { useEffect, useState } from "react";
import "../counter.css";

export default function Navbar({ total }: { total: number }) {
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    setFlip(true);
    const t = setTimeout(() => setFlip(false), 400);
    return () => clearTimeout(t);
  }, [total]);

  return (
    <nav className="navbar navbar-expand navbar-dark bg-transparent sticky-top">
      <div className="container-fluid">
        <div className="ms-auto me-3">
          <div className="count petscountdiv bg-white px-3 py-1 rounded">
            Pets around the 🌍:{" "}
            <b className={flip ? "flip" : ""}>{total.toLocaleString()}</b>
          </div>
        </div>
      </div>
    </nav>
  );
}
