// ** React Imports
import { Typography } from "@mui/material";
import { ReactNode, useEffect } from "react";

// ** Layout Import
import AnimateSignature from "src/@core/layouts/components/AnimateSignature";

/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = (role: string) => {
  if (role === "client") return "/acl";
  return "/document";
};

const Home = () => {

  const handleUpdate = (x: number, y: number) => {
    document.documentElement.style.setProperty('--cursorX', `${x}px`);
    document.documentElement.style.setProperty('--cursorY', `${y}px`);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleUpdate(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    handleUpdate(e.touches[0].clientX, e.touches[0].clientY);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []); 

  return (
    <>
      <Typography>
        {'Welcome To my Profile'}
      </Typography>
      <AnimateSignature />
    </>
  );
};

export default Home;
