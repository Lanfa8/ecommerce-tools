'use client';

import { Anchor } from "@mantine/core";
import { motion } from "framer-motion";

export default function ScrollDownButton({ targetId, component }: { targetId: string, component: React.ReactNode }) {
  const scrollToComponent = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 1.2 }}
    >
      <Anchor component="button" onClick={scrollToComponent} underline="always">
        {component}
      </Anchor>
    </motion.div>
  );
}