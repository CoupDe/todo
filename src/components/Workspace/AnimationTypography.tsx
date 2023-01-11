import { AnimatePresence, motion, Variants } from "framer-motion";
import React from "react";
type Props = { children?: JSX.Element | never[]; items: string[] };

const container: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
  }),
};
//Есть небольшой рывок  при появление нового элемента
const child: Variants = {
  exit: { opacity: 0, y: 20, transition: { translate: 0.2 } },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    x: 20,

    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
    },
  },
};

const AnimationTypography: React.FC<Props> = ({
  children,
  items,
}: Props): JSX.Element => {
  const departamentList = (item: string) => {
    const concatItem = item.concat(":");
    
    return (
      <motion.span
        key={item}
        variants={child}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{ marginRight: "2px" }}
      >
        {item !== items.slice(-1).toString() && item !== "Отдел"
          ? concatItem
          : item}
      </motion.span>
    );
  };

  return (
    <>
      <motion.div
        style={{
          overflow: "hidden",
          display: "flex",
          fontSize: "1rem",
        }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="sync">
          {items.length !== 0
            ? items.map((item) => departamentList(item))
            : departamentList("Отдел")}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default AnimationTypography;
