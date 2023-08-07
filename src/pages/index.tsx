// ** React Imports
import { Typography, Box, Grid, Avatar } from "@mui/material";
import { ReactNode, useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { RoughEase } from "gsap/EasePack";
import * as _ from "lodash";

// ** Layout Import
import AnimateSignature from "src/@core/components/AnimateSignature";
import HackedTextTitle from "src/@core/components/HackedTextTitle";

/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = (role: string) => {
  if (role === "client") return "/acl";
  return "/document";
};

const Home = () => {
  const refBanner = useRef<HTMLDivElement | null>(null);
  const refStar = useRef<HTMLDivElement | null>(null);
  const stars: { element: HTMLElement; timeline: TimelineMax }[] = [];
  // const [eases, setEases] = useState<typeof RoughEase[]>([])
  const [eases, setEases] = useState<string[]>([]);

  const numAnimations = 50;
  const numStars = 300;

  const createStar = (frag) => {
    if (!refStar.current || !refBanner.current) {
      throw new Error("refStar.current is null");
    }

    const starElement = refStar.current.cloneNode(true) as HTMLElement;

    const bannerWidth = refBanner.current.offsetWidth;
    const bannerHeight = refBanner.current.offsetHeight;

    frag.appendChild(starElement);

    gsap.set(starElement, {
      rotation: random(360),
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      x: random(bannerWidth),
      y: random(bannerHeight),
    });

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    for (let i = 0; i < numAnimations; i++) {
      const ease1 = eases[Math.floor(random(numAnimations))];
      const ease2 = eases[Math.floor(random(numAnimations))];

      const alpha = random(0.7, 1);
      const scale = random(0.15, 0.4);

      const appear = "+=" + random(0.3, 0.8);
      const delay = "+=" + random(2, 6);
      const duration1 = random(0.3, 1);
      const duration2 = random(0.3, 1);

      tl.to(
        starElement,
        duration1,
        { autoAlpha: alpha, scale: scale, ease: ease1 },
        delay
      ).to(
        starElement,
        duration2,
        { autoAlpha: 0, scale: 0, ease: ease2 },
        appear
      );
    }

    tl.progress(random(1));

    return {
      element: starElement,
      timeline: tl,
    };
  };

  useEffect(() => {
    const frag = document.createDocumentFragment();
    // for (let i = 0; i < numAnimations; i++) {
    //   const ease = gsap.registerEase("", () => ({
    //     name: `roughEase${i}`,
    //     ease: "none",
    //     roughEase: {
    //       strength: random(1, 3),
    //       points: Math.floor(random(50, 200)),
    //       taper: "both",
    //       randomize: true,
    //       clamp: true,
    //     },
    //   }));

    //   eases.push(ease);
    // }

    const newEases: string[] = [];

    for (let i = 0; i < numAnimations; i++) {
      const easeName = `roughEase${i}`;

      // Define a custom ease function
      gsap.registerEase(easeName, function (progress) {
        // Modify the progress value to create a "rough" effect
        // This is just an example; you'll need to write code that creates the effect you want
        return progress + (Math.random() - 0.5) * 0.1;
      });

      newEases.push(easeName);
    }

    setEases(newEases);

    for (let i = 0; i < numStars; i++) {
      stars.push(createStar(frag));
    }

    if (refBanner.current) {
      refBanner.current.appendChild(frag);
    }
  }, []);

  const random = (min: number, max?: number) => {
    if (max == null) {
      max = min;
      min = 0;
    }
    if (min > max) {
      const tmp = min;
      min = max;
      max = tmp;
    }
    return min + (max - min) * Math.random();
  };

  const handleUpdate = (x: number, y: number) => {
    document.documentElement.style.setProperty("--cursorX", `${x}px`);
    document.documentElement.style.setProperty("--cursorY", `${y}px`);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleUpdate(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    handleUpdate(e.touches[0].clientX, e.touches[0].clientY);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <Grid container id="banner" ref={refBanner}>
      <Box id="star" ref={refStar}></Box>
      <Grid item xs={12} className="flex justify-center items-center">
        <Grid
          container
          maxWidth="md"
          className="m-auto bgNeonGithub h-auto absolute"
        ></Grid>
        <Grid
          container
          maxWidth="md"
          className="neon m-auto h-auto absolute z-10 bg-transparent"
        >
          {/* <Grid item xs={12} className="bgNeonGithub"></Grid> */}
          <Grid item xs={12} className="relative h-full">
            <HackedTextTitle />
            <Typography>{"Welcome To my Profile"}</Typography>
            {_.range(4).map((tag) => {
              <Avatar variant="rounded">
                <Typography>{"Welcome To my Profile"}</Typography>
              </Avatar>;
            })}
            <img src="./images/neon-signature.png" />
          </Grid>
        </Grid>
      </Grid>
      {/* <AnimateSignature /> */}
    </Grid>
  );
};

export default Home;
