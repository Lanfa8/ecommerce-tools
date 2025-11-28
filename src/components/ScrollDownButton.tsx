'use client';

import { Anchor } from "@mantine/core";
import { IconArrowDown } from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function ScrollDownButton({ targetId }: { targetId: string }) {
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
        <IconArrowDown size={48} color="var(--mantine-color-teal-5)"/>
      </Anchor>
    </motion.div>
  );
}