import { useEffect, useState } from "react";
import MemoizedGameRandomName from "./components/GameRandomName/GameRandomName";
import Menu from "./components/Menu/Menu";
import SettingIcon from "./components/SettingIcon/SettingIcon";
import CloseIcon from "./components/CloseIcon/CloseIcon";

export default function Home() {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [names, setNames] = useState([]);
  const [counter, setCounter] = useState(0);
  const [animationIsComplete, setAnimationIsComplete] = useState(false)

  function getLocalStorageState() {
    const storedNames = localStorage.getItem("names");
    if (storedNames) {
      setNames(JSON.parse(storedNames));
    }
  }

  useEffect(() => {
    getLocalStorageState();
  }, []);

  function spin() {
    if (names.length === 0) {
      setIsShowMenu(true);
    } else {
      setAnimationIsComplete(false)
      setShowWinner(true);
      setCounter(counter + 1);
    }
  }

  function spinAgain() {
    setShowWinner(false);
    setAnimationIsComplete(false)

    setTimeout(() => {
      setShowWinner(true);
    }, 100);
  }

  return (
    <div className="bg-overlay">
      <Menu
        isShowMenu={isShowMenu}
        setIsShowMenu={setIsShowMenu}
        names={names}
        setNames={setNames}
      />
      <main className="main-container">
        <button className="menu-btn" onClick={() => setIsShowMenu(!isShowMenu)}>
          {!isShowMenu ? <SettingIcon /> : <CloseIcon />}
        </button>
        <div className="slot-container">
          <div className="slot-border">
            <div className="slot">
              <MemoizedGameRandomName
                names={[...names]}
                setNames={setNames}
                showWinner={showWinner}
                transitionDuration={8}
                setAnimationIsComplete={setAnimationIsComplete}
              />
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          {names.length > 0 ? (
            <p>Lista de participantes cargada</p>
          ) : (
            <p>
              No se han cargado participantes.
              <br />
              <strong>
                Por favor, carga un archivo de Excel para comenzar.
              </strong>
            </p>
          )}
        </div>

        <div className="btn-group">
          {counter >= 1 ? (
            <button
            className={`sort-btn ${!animationIsComplete ? "disabled" : ""}`}
            disabled={!animationIsComplete}

              onClick={spinAgain}
            >
              Sortear de nuevo
            </button>
          ) : (
            <button className="sort-btn" onClick={spin}>
              Sortear
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
