import { useEffect, useRef } from "react";
import styles from "./FileInput.module.css";
import classNames from "classnames";
import PropTypes from "prop-types";

import * as XLSX from "xlsx";

function FileInput({ setNames, selectedFileName, setSelectedFileName }) {
  const acceptedFileTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
    ".xlsx",
    ".xls",
  ];

  useEffect(() => {
    clearFileSelection();
  }, [selectedFileName]);

  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const extension = file.name.split(".").pop().toLowerCase();
      if (
        !acceptedFileTypes.includes(file.type) &&
        !acceptedFileTypes.includes("." + extension)
      ) {
        // Si la extensión del archivo no está en la lista de tipos aceptados, mostrar un mensaje de error
        alert("El tipo de archivo seleccionado no es válido.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Obtener todas las celdas en la columna A
        const range = XLSX.utils.decode_range(sheet["!ref"]);
        const columnA = [];
        for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
          const cell = sheet[XLSX.utils.encode_cell({ r: rowNum, c: 0 })];
          columnA.push(cell ? cell.v : "");
        }

        // Filtrar celdas vacías y asignar nombres
        const names = columnA.filter((name) => name.trim() !== "");
        setNames(names);
      };

      reader.readAsArrayBuffer(file);
      setSelectedFileName(file.name);
    }
  };

  const clearFileSelection = () => {
    // Restablecer el valor del input de archivo
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form>
      <div className={classNames(styles.fileSelectorContainer)}>
        <label className={classNames(styles.fileHelpLabel)} htmlFor="FileInput">
          Por favor, carga un archivo de Excel.
        </label>
        <input
          ref={fileInputRef}
          onChange={handleFileUpload}
          type="file"
          id="FileInput"
          className={classNames(styles.fileSelectorInput)}
          accept={acceptedFileTypes.join(", ")}
        />

        <label
          className={classNames(styles.fileSelectorLabel)}
          htmlFor="FileInput"
        >
          Seleccionar archivo
        </label>

        <span className={classNames(styles.fileSelectedName)}>
          {selectedFileName
            ? selectedFileName
            : "No se ha seleccionado ningún archivo."}
        </span>
      </div>
    </form>
  );
}

FileInput.propTypes = {
  setNames: PropTypes.func.isRequired,
  selectedFileName: PropTypes.string,
  setSelectedFileName: PropTypes.func.isRequired,
};

export default FileInput;
