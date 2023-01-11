import { Replay } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Box, Fab, Fade, Typography } from "@mui/material";
import { default as MyGrid } from "@mui/material/Unstable_Grid2"; // Grid version 2
import { motion } from "framer-motion";
import { useState } from "react";
import { machineStep } from "../../services/gameLogic/gameLogic";
import { IGameStep, IStatusGame } from "../../typeinterfaces/types";
import PreviewIntro from "./PreviewIntro";
import { MyItem, Reload, StyledGrid } from "./styledHomePage";
const HomePage = () => {
  const [showGame, setShowGame] = useState<boolean>(false);

  const [statusGame, setStatusGame] = useState<IStatusGame>({
    winner: null,
    draw: false,
  });

  const [isTouch, setTouch] = useState<boolean[]>(Array(9).fill(false));

  const [step, setStep] = useState<IGameStep>({
    compStep: [],
    playerStep: [],
  });

  //Сброс значений при рестарте игры
  function restartGame() {
    setTimeout(() => {
      setStep({
        playerStep: [],
        compStep: [Math.floor(Math.random() * 9)],
      });
      setStatusGame({
        winner: null,
        draw: false,
      });
      setTouch(Array(9).fill(false));
    }, 300);
  }
  /*Наверное глупое решение прибегать к async-await с целью создания искуственной
  задержки между воспроизведением анимации и элементов обновляемые в одном стейте*/
  function sleep() {
    return new Promise((resolve) => setTimeout(resolve, 200));
  }

  async function startGame() {
    setShowGame(true);

    setStep((prev) => ({
      playerStep: [...prev.playerStep],
      compStep: [...prev.compStep, Math.floor(Math.random() * 9)], //
    }));

    isTouch.map((val, index) => (index === step.compStep[0] ? true : val));
  }
  //Анимация карточки
  async function setValue(e: React.MouseEvent<Element, MouseEvent>) {
    const id = +e.currentTarget.id;

    await sleep();
    setTouch(isTouch.map((val, index) => (index === id ? true : val)));

    if (!step.playerStep.includes(id) && !step.compStep.includes(id)) {
      const playerStep = step.playerStep.concat(id);
      const compStep = step.compStep;
      const allStep = [...playerStep, ...compStep];
      await sleep();
      const logicStep = machineStep(playerStep, compStep, allStep);

      setStatusGame({ ...logicStep.statusGame });

      setTouch(
        isTouch.map((val, index) => (index === logicStep.step ? true : val))
      );
      setStep((prev) => ({
        playerStep: [...prev.playerStep, id],
        compStep: [...prev.compStep, logicStep.step],
      }));
    }
  }

  function Card({ index }: { index: number }): JSX.Element {
    if (step.playerStep.includes(index)) {
      return (
        <CloseIcon
          sx={{ width: "140px", height: "140px" }}
          color={statusGame.winner?.includes(index) ? "success" : "primary"}
        />
      );
    } else if (step.compStep.includes(index)) {
      return (
        <RadioButtonUncheckedIcon
          sx={{ width: "110px", height: "110px" }}
          color={statusGame.winner?.includes(index) ? "success" : "primary"}
        />
      );
    } else {
      return <Box sx={{ width: "140px", height: "140px" }} />;
    }
  }

  return (
    <>
      {/* Применение px ???? */}
      <Box
        sx={{
          width: "1152px",

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        aria-label="intro"
      >
        {/* Настроить задержку */}
        <MyGrid
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 3 }}
          container
          spacing={2}
          columns={12}
          sx={{
            gridTemplateColumns: "repeat(3,1fr)",
            display: "grid",
            minWidth: "30%",
            justifyItems: "center",
            position: "relative",
          }}
        >
          {(statusGame.winner !== null || statusGame.draw) && (
            <Reload>
              <Fade in={true}>
                <Typography
                  sx={{ marginTop: 1 }}
                  color="secondary"
                  variant="h3"
                >
                  {statusGame.winner !== null ? "Победа!" : "Ничья!"}
                </Typography>
              </Fade>
              <Fade in={true}>
                <Fab
                  color="secondary"
                  sx={{
                    marginTop: 15,
                    height: "100px",
                    width: "100px",
                    opacity: "0.7",
                  }}
                  onClick={() => restartGame()}
                  aria-label="replay"
                >
                  <Replay fontSize="large" />
                </Fab>
              </Fade>
            </Reload>
          )}

          {/* Скачет разметка */}
          {showGame &&
            Array.from(Array(9)).map((_, index) => {
              return (
                <StyledGrid sx={{ alignItems: "center" }} key={index}>
                  <MyItem
                    sx={{
                      alignItems: "center",
                      width: "140px",
                      height: "140px",
                    }}
                    $isTouched={isTouch[index]}
                    onClick={(e: React.MouseEvent<Element, MouseEvent>) =>
                      setValue(e)
                    }
                    elevation={8}
                    id={`${index}`}
                  >
                    <Card index={index} />
                  </MyItem>
                </StyledGrid>
              );
            })}
        </MyGrid>

        <PreviewIntro startGame={startGame} />
      </Box>
    </>
  );
};

export default HomePage;
