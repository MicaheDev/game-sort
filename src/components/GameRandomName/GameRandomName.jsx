/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import style from "./GameRandomName.module.css";
import PropTypes from "prop-types";
import Confetti from "react-confetti";
import ImgUrl from "./../../assets/sunburst.png"

export function GameRandomName({
  names,
  setNames,
  showWinner,
  transitionDuration,
  setAnimationIsComplete
}) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(false);
  }, [showWinner]);

  const getWinner = useMemo(() => {
    if (names.length > 0 && showWinner) {
      const randomIndex = Math.floor(Math.random() * names.length);

      const newList = names.filter((name) => name !== names[randomIndex]);
      if (names.length > 1) {
        setNames(newList);
        localStorage.setItem("names", JSON.stringify(newList));
      }
      renderConfetti();

      return names[randomIndex];
    }
  }, [showWinner]);

  function getNameContainerStyles() {
    if (showWinner) {
      // const height = (names.length - 1) * 1.5;
      return {
        opacity: 1,
        transform: `translateY(0%)`,
        transition: `transform ${transitionDuration}s cubic-bezier(0.075, 0.82, 0.165, 1), opacity ${
          transitionDuration * 0.2
        }s ease-out`,
        color: "#000",
      };
    }
    return {
      opacity: 0,
      transform: "translateY(-100%)",
      transition: "none",
      color: "#000",
    };
  }

  function renderConfetti() {
    setTimeout(() => {
      setShowConfetti(true);
      setAnimationIsComplete(true)
    }, (transitionDuration - 2 ) * 1000);
  }

  return (
    <>
      <div
        className={classNames(
          style.gameRandomName,
          showWinner && style.showWinner
        )}
      >
        <div className={style.nameContainerOffset}>
          <div className={style.nameContainer} style={getNameContainerStyles()}>
            {[getWinner, names[names.length - 1], ...names].map((n, i) => (
              <div
                key={i + n + `n-${i}`}
                className={i === 0 ? style.winner : undefined}
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      </div>

      <img
        className={`winner-decoration ${showConfetti ? "show" : ""}`}
        width={700}
        height={700}
        src={ImgUrl}
        alt=""
      />

      <div className={`confetti ${showConfetti ? "show" : ""}`}>
        <Confetti />
      </div>
    </>
  );
}

GameRandomName.propTypes = {
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  setNames: PropTypes.func.isRequired,
  showWinner: PropTypes.bool.isRequired,
  transitionDuration: PropTypes.number.isRequired,
  setAnimationIsComplete: PropTypes.func.isRequired
};

const MemoizedGameRandomName = memo(GameRandomName);

export default MemoizedGameRandomName;
