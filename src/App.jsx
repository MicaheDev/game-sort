import { useEffect, useState } from "react";
import MemoizedGameRandomName from "./components/GameRandomName/GameRandomName";
import Menu from "./components/Menu/Menu";
import SettingIcon from "./components/SettingIcon/SettingIcon";
import CloseIcon from "./components/CloseIcon/CloseIcon";

export default function Home() {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [names, setNames] = useState([]);

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
      setShowWinner(true);
    }
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
              />
            </div>
          </div>
        </div>

        {names.length > 0 ? (
          <p>Lista cargada</p>
        ) : (
          <p>
            No se han cargado participantes.
            <br />
            <strong>Carga un archivo de Exel para comenzar</strong>
          </p>
        )}

        <div className="btn-group">
          <button
            className={`sort-btn ${showWinner ? "disabled" : ""}`}
            onClick={spin}
          >
            Girar
          </button>
          <button
            className={`sort-btn ${!showWinner ? "disabled" : ""}`}
            onClick={() => setShowWinner(false)}
          >
            Reiniciar
          </button>
        </div>
      </main>
    </div>
  );
}
