import { Box, Button, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useLocation } from "react-router";
import { Link as RouterLink, Outlet } from "react-router-dom";
import AnimationLinkButton from "./AnimationLinkButton";
const pageVariants = {
  initial: {
    opacity: 0.1,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  duration: 0.5,
};
type Props = JSX.Element;
export const AnimationOutlet = ({ children }: { children: Props }) => {
  const { pathname } = useLocation();
  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

const LoginLayout = () => {
  const [showProjectLink, setShowProjectLink] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);

  return (
    <>
      <main>
        <Box
          sx={{
            display: "flex",

            width: "100%",
            height: "100vh",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
          component="section"
        >
          {/* {showProjectLink && <LinkButton variant="outlined">Tru</LinkButton>} */}
          {showProjectLink && (
            <Box
              sx={{
                alignSelf: "flex-end",
                margin: "0 20px 0 0",
                width: 150,
                height: 40,
                position: "absolute",
                top: "40px",
              }}
            >
              <AnimatePresence mode="wait">
                <Box
                  sx={{
                    display: "inline-flex",
                    width: 150,
                    height: 40,
                    justifyContent: "space-between",
                    position: "absolute",
                    alignItems: "center",
                    top: "30px",
                  }}
                >
                  {!showButton ? (
                    <AnimationLinkButton
                      setShowButton={setShowButton}
                      key={"BluePrint"}
                    />
                  ) : (
                    <Box
                      component={motion.div}
                      initial={{ opacity: 0 }}
                      sx={{ width: "100%", height: "100%" }}
                      animate={{ opacity: [1, 0, 1, 0, 1] }}
                      transition={{ duration: 0.4 }}
                      key={"LinkBtn"}
                    >
                      <Button
                        // component={motion.button}
                        component={RouterLink}
                        sx={{ height: "100%" }}
                        to="login/"
                        fullWidth
                        variant="outlined"
                        onClick={() => setShowProjectLink(false)}
                      >
                        Go project
                      </Button>
                    </Box>
                  )}
                </Box>
              </AnimatePresence>
            </Box>
          )}

          <Typography
            letterSpacing={"3px"}
            mt={"40px"}
            variant="h4"
            component="h1"
          >
            TODO'{" "}
            <Box
              component="span"
              sx={{ fontStyle: "italic", fontFamily: "Arial" }}
            >
              шник
            </Box>
          </Typography>
          <Box
            sx={{
              paddingTop: "20px",
              display: "flex",
              height: "80vh",
              alignItems: "center",
            }}
            aria-label="MiddleLayout"
          >
            <AnimationOutlet>
              <Outlet context={setShowProjectLink} />
            </AnimationOutlet>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default LoginLayout;
