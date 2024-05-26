import { useEffect, useState } from "react";
import styles from "./TextArea.module.css";
import classNames from "classnames";
import PropTypes from "prop-types";

function TextArea({ names, setNames, setIsShowMenu, setSelectedFileName }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (Array.isArray(names)) {
      // Une los elementos del array con saltos de línea
      const arrayNames = names.join("\n");
      // Establece el valor del input
      setValue(arrayNames);
      // Opcional: imprime el array original
    }
  }, [names]);

  function handleTextArea(e) {
    setValue(e.target.value);
  }

  function handleSave(e) {
    e.preventDefault();
    // Convertir el texto en lista separando por saltos de linea
    const newList = value.split(/\n/);
    setNames(newList);
    setIsShowMenu(false);
  }

  function handleClear() {
    setNames([]);
    setSelectedFileName(null);
    localStorage.removeItem("names");
  }

  return (
    <form onSubmit={handleSave}>
      <div className={classNames(styles.textAreaContainer)}>
        <div>
          <label
            className={classNames(styles.textAreaLabel)}
            htmlFor="TextArea"
          >
            Completa la lista de forma manual
          </label>
          <textarea
            onChange={(e) => handleTextArea(e)}
            value={value}
            type="text"
            placeholder="Escribe los nombres separados por saltos de linea"
            id="TextArea"
            className={classNames(styles.textArea)}
          />
        </div>
        <div className={classNames(styles.btnGroup)}>
          <button className={classNames(styles.btn)} type="submit">
            Guardar
          </button>
          <button
            onClick={handleClear}
            type="button"
            className={classNames(styles.btn)}
          >
            Limpiar
          </button>
        </div>
      </div>
    </form>
  );
}

TextArea.propTypes = {
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  setNames: PropTypes.func.isRequired,
  setIsShowMenu: PropTypes.func.isRequired,
  setSelectedFileName: PropTypes.func.isRequired,
};

export default TextArea;
