// ** React Imports
import { Typography, Box, Grid, Container, Stack, Chip } from "@mui/material";
import { ReactNode, useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { RoughEase } from "gsap/EasePack";
import Image from "next/image";
import * as _ from "lodash";

// ** Layout Import
import AnimateSignature from "src/@core/components/AnimateSignature";
import HackedTextTitle from "src/@core/components/HackedTextTitle";

import bgNeonGithub from "public/images/neon-github-workspace.png";

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

  const numAnimations = 100;
  const numStars = 200;

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
      const delay = "+=" + random(5, 12);
      const duration1 = random(1, 2);
      const duration2 = random(1, 2);

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

  const text = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.\n
  \nPhasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,`;

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
    <Box
      className="relative flex h-auto"
      ref={refBanner}
      sx={{
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
      }}
    >
      <Grid
        container
        flexDirection="column"
        justifyContent="start"
        alignItems="center"
        maxWidth="lg"
        className="mx-auto py-28 relative"
        sx={{
          top: "calc(50% - 250px)",
        }}
      >
        <Grid
          item
          xs={12}
          className="m-auto bgNeonGithub h-auto absolute w-full"
          sx={{
            background: `url(${bgNeonGithub.src}) no-repeat center`,
          }}
        ></Grid>
        <Grid item xs={12}>
          <Grid
            container
            className="neon m-auto h-auto z-10 bg-transparent p-2"
          >
            <Grid
              item
              xs={12}
              className="relative h-auto flex gap-4"
              sx={{ flexDirection: "column" }}
            >
              <HackedTextTitle />
              <Typography>{"Full Stack Developer"}</Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {_.range(20).map((tag: number) => (
                  <Chip
                    label={`Label ${tag}`}
                    color="primary"
                    variant="outlined"
                    key={tag}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              className="relative h-full flex gap-4"
              sx={{ flexDirection: "column" }}
            >
              <Grid className="mx-auto">
                <Typography variant="body1">{"Summary Text"}</Typography>
              </Grid>
              <Grid className="mx-auto">
                <Typography>
                  {text.split("\n").map((line) => `${line}<br />`)}
                </Typography>
              </Grid>

              <Grid className="mx-auto">
                <Typography variant="body1">{"Summary Text"}</Typography>
              </Grid>
              <Grid className="mx-auto">
                <Typography>
                  {text.split("\n").map((line) => `${line}<br />`)}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              className="relative h-full flex gap-4"
              sx={{
                flexDirection: "column",
                height: "150px",
                position: "relative",
                width: "100%",
              }}
            >
              <Image
                src="./images/neon-signature.png"
                alt="neonSignature"
                layout="fill"
                objectFit="contain"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box id="star" ref={refStar}></Box>
    </Box>
  );
};

export default Home;
