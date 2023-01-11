import { Box, Divider } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export interface ILinkBtnProps {
  setShowButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const skeletShow = {
  hidden: { y: -500, opacity: 1 },
  dropIn: (time: number) => ({
    y: [-500, 60, 0],
    transition: { delay: time * 0.15 },
  }),
  dropInMiddle: {
    y: [-500, 40, 0],
    rotate: 180,
    transition: { delay: 0.4, duration: 1 },
  },

  exitMiddle: {
    y: 0,
    opacity: 0,
    rotate: 180,
    transition: { duration: 0.2 },
  },
};
const buttonBlueprint = {
  startSlide: { scale: 0.5 },
  moveDevider: (move: number) => ({
    y: move,
    scale: 1,
    transition: { duration: 0.3 },
  }),
};
const MVerticalDevider = ({ timer }: { timer: number }) => {
  return (
    <Divider
      custom={timer}
      component={motion.hr}
      variants={skeletShow}
      initial="hidden"
      animate="dropIn"
      role="presentation"
      sx={{ border: "1px solid rgba(255, 255, 255, 0.5)", height: "100%" }}
      orientation="vertical"
    />
  );
};
const MHorizontalDevider = ({ move, cb }: { move: number; cb: () => void }) => {
  return (
    <Divider
      custom={move}
      component={motion.hr}
      onAnimationComplete={() => cb()}
      key={move}
      variants={buttonBlueprint}
      initial="startSlide"
      animate="moveDevider"
      role="presentation"
      sx={{ border: "1px solid rgba(255, 255, 255, 0.5)", width: "100%" }}
    />
  );
};

const AnimationLinkButton: React.FC<ILinkBtnProps> = ({ setShowButton }) => {
  const [hidden, setHidden] = useState<boolean>(true);

  function onComplete(): void {
    setHidden(false);
  }

  return (
    <>
      <MVerticalDevider key="left" timer={1} />
      <AnimatePresence mode="wait">
        {hidden ? (
          <Divider
            component={motion.hr}
            onAnimationComplete={() => onComplete()}
            key="middle"
            variants={skeletShow}
            initial="hidden"
            animate="dropInMiddle"
            exit="exitMiddle"
            role="presentation"
            sx={{ border: "2px solid", width: "50%" }}
          />
        ) : (
          <>
            <Box sx={{ width: "100%" }}>
              <MHorizontalDevider move={-24} cb={() => setShowButton(true)} />
              <MHorizontalDevider move={24} cb={() => setShowButton(true)} />
            </Box>
          </>
        )}
      </AnimatePresence>
      <MVerticalDevider key="right" timer={1.5} />
      {/* {showButton && (
        
      )} */}
    </>
  );
};

export default AnimationLinkButton;
