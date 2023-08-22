import { useRef, useEffect, useState } from "react";

import { Typography, Grid } from "@mui/material";

const HackedTextTitle = () => {
  const refTitle = useRef<HTMLDivElement | null>(null);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789!@#$%&";
  const targetText = "Ittichai Boonyarakthunya";
  const [animationInterval, setAnimationInterval] =
    useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    textAnimateEffect();
  }, []);

  const textAnimateEffect = () => {
    let iteration = 0;
    
    if (!refTitle.current?.textContent)
    {
      throw new Error('refTitle.current.textContent');
      return;
    }

    if (animationInterval) {
      clearInterval(animationInterval);
    }

    const interval = setInterval(() => {

      if (!refTitle.current?.textContent || refTitle.current.textContent.length === 0)
      {
        throw new Error('event.currentTarget');
        return;
      }

      refTitle.current.innerText = targetText
        .split('')
        .map((letter, index) => {
          if (index < iteration && targetText) {
            return targetText[index];
          }

          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join('');

      if (iteration >= refTitle.current.textContent.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    setAnimationInterval(interval);
  };

  return (
    <Grid item xs={12} className="text-center uppercase">
      <Typography ref={refTitle} component="div" variant="h3" color="white">
        {"Ittichai Boonyarakthunya"}
      </Typography>
    </Grid>
  );
};

export default HackedTextTitle;
