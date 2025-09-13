import { useEffect, useState } from "react";
import { fetchCount, petOnce } from "./api";
import Navbar from "./components/Navbar";
import "./styles.css";

export default function App() {
  const [total, setTotal] = useState(0);
  const [petting, setPetting] = useState(false);

  useEffect(() => {
    fetchCount().then(setTotal).catch(console.error);
  }, []);

  useEffect(() =>{
    const id = setInterval(() => {
      fetchCount().then(setTotal).catch(console.error);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  async function onPet() {
    setPetting(true);
    try {
      const newTotal = await petOnce();
      setTotal(newTotal);
    } finally {
      setTimeout(() => setPetting(false), 300);
    }
  }

  return (
    <>
      <div className="container-fluid">
        <Navbar total={total} />
      </div>
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
        <div className="catouterbox text-center">
          <div className="catbox">
            <span className={`hand ${petting ? "hand-in" : ""}`}>{petting ? "🫳" : "🫱"}</span>
            <span className="cat">{petting ? "😸" : "🐱"}</span>
          </div>
          <button onClick={onPet} className="btn btn-outline-warning">
            pet
          </button>
        </div>
      </div>
    </>
  );
}
