import { useState } from "react";
import FileInput from "../FileInput/FileInput";
import TextArea from "../TextArea/TextArea";
import classNames from "classnames";
import styles from "./Menu.module.css";
import PropTypes from "prop-types";

function Menu({ names, setNames, isShowMenu, setIsShowMenu }) {
  const [selectedFileName, setSelectedFileName] = useState(null);

  return (
    <>
      <menu
        className={classNames(
          styles.menuContainer,
          !isShowMenu ? styles.collapsed : styles.expanded
        )}
      >
        <h1 className={classNames(styles.title)}>Configuración</h1>
        <div className={classNames(styles.formGroup)}>
          <p className={classNames(styles.helpText)}>
            Rellena la lista mediante un archvio Exel o completala de forma
            manual
          </p>

          <FileInput
            setNames={setNames}
            selectedFileName={selectedFileName}
            setSelectedFileName={setSelectedFileName}
          />
          <TextArea
            names={names}
            setNames={setNames}
            setIsShowMenu={setIsShowMenu}
            setSelectedFileName={setSelectedFileName}
          />
        </div>
      </menu>
      <div
      onClick={() => setIsShowMenu(false)}
        className={classNames(
          styles.overlay,
          !isShowMenu ? styles.collapsed : styles.expanded
        )}
      ></div>
    </>
  );
}

Menu.propTypes = {
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  setNames: PropTypes.func.isRequired,
  isShowMenu: PropTypes.bool.isRequired,
  setIsShowMenu: PropTypes.func.isRequired,
};

export default Menu;
