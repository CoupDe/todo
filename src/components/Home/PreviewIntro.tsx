import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useOutletContext } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import photo from "../../images/photo/photo.jpg";

const PreviewIntro: React.FC<{ startGame: Function }> = ({ startGame }) => {
  const setShowProjectLink =
    useOutletContext<React.Dispatch<React.SetStateAction<boolean>>>();

  return (
    <Box
      sx={{
        width: "50%",

        display: "flex",
        alignSelf: "start",
        justifyContent: "center",
        flexDirection: "column",

        marginX: "4px",
      }}
      aria-label="introText"
    >
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Avatar
          sx={{
            marginY: "4px",
            width: "100px",
            height: "100px",
            margin: "0 auto",
            alignSelf: "center",
          }}
          alt="Portfolio_photo"
          src={photo}
        />
      </Box>
      {/* сделать выравнивание текста слева */}
      <Box sx={{ minWidth: "500px", minHeight: "400px" }}>
        <TypeAnimation
          sequence={[
            "Добро пожаловать в мой 'мини' Pet-проект котрый является класический TODO-list, за исключением того что он представляет из себя полноценное приложение в котором реализованно взаимодействие клиента с сервером, Front-end и мнойbackend написан полность мной. А перед тем, как я вам немного расскажу про используемые технологии, предлогаю вам вспомнить школьную игру,",
            500,
            () => {
              startGame();
            },
            "Добро пожаловать в мой 'мини' Pet-проект котрый является класический TODO-list, за исключением того что он представляет из себя полноценное приложение в котором реализованно взаимодействие клиента с сервером, Front-end и backend написан полность мной. А перед тем, как я вам немного расскажу про используемые технологии, предлогаю вам вспомнить школьную игру, ну или присупить сразу к просмотру проекта",
            1000,
            () => {
              setShowProjectLink(true);
            },
          ]}
          speed={99}
          style={{ fontSize: "1.1em", font: "Arial", textIndent: "25px" }}
          wrapper="p"
          repeat={0}
        />
      </Box>
    </Box>
  );
};

export default PreviewIntro;
