/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Grid, GridProps, Button } from "@mui/material";

const AnimateSignatureSection = styled(Grid)<GridProps>(({ theme }) => ({
  position: "relative",
  overflow: "auto",
  width: "100%",
  height: 0,
  paddingBottom: "55.30973451%",
  "& > svg": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "AnimateSignature.tsx",
    height: "auto",
  },
}));

const AnimateSignature = () => {
  const theme = useTheme();

  const signatureRef = useRef<SVGSVGElement | null>(null);

  const initialize = () => {
    if (!signatureRef.current) return;

    const paths = signatureRef.current.querySelectorAll("path");
    let delay = 0;
    paths.forEach((path: SVGPathElement) => {
      const length = path.getTotalLength();
      const previousStrokeLength = path.style.strokeDashoffset || "0";
      const speed = length < 100 ? 20 : Math.floor(length);
      console.log(`speed`, speed)
      delay += parseFloat(previousStrokeLength) + 100;
      path.style.transition = "none";
      path.setAttribute("data-length", `${length}`);
      path.setAttribute("data-speed", `${speed}`);
      path.setAttribute("data-delay", `${delay}`);
      path.setAttribute("stroke-dashoffset", `${length}`);
      path.setAttribute("stroke-dasharray", `${length},${length}`);
    });
  };

  const animate = () => {
    if (!signatureRef.current) return;

    const paths = signatureRef.current.querySelectorAll("path");
    paths.forEach((path: SVGPathElement) => {
      const length = path.getAttribute("data-length");
      const speed = path.getAttribute("data-speed");
      const delay = path.getAttribute("data-delay");
      path.style.transition = `stroke-dashoffset ${speed}ms ${delay}ms linear`;
      path.setAttribute("stroke-dashoffset", "0");
    });
  };

  useEffect(() => {
    if (!signatureRef.current) return;
    const timer = setTimeout(() => {
      initialize();
      animate();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const reloadAnimate = () => {
    initialize();
    const timer = setTimeout(animate, 500);
    return () => clearTimeout(timer);
  };

  return (
    <>
      <Button variant="outlined" onClick={reloadAnimate}>
        reload
      </Button>
      <AnimateSignatureSection className="signature">
        <svg
          ref={signatureRef}
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="600.000000pt"
          height="350.000000pt"
          viewBox="0 0 600.000000 350.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,350.000000) scale(0.100000,-0.100000)"
            fill="#000000"
            stroke="black" // change stroke to black
          >
          <path
            d="M4890 2840 c-41 -11 -115 -40 -165 -64 -96 -47 -337 -195 -370 -227
-19 -19 -19 -19 3 -41 24 -24 43 -18 21 8 -12 14 -10 19 14 40 33 28 161 104
177 104 14 0 9 -58 -37 -420 -19 -157 -42 -300 -50 -317 -9 -18 -12 -44 -9
-57 3 -14 -3 -85 -13 -158 -10 -73 -21 -158 -24 -188 l-6 -55 19 60 c11 33 31
116 46 185 14 69 29 132 33 140 9 17 207 83 336 112 127 28 265 29 327 1 52
-24 68 -46 68 -95 0 -43 -34 -94 -129 -191 -192 -197 -471 -378 -702 -454 -83
-28 -84 -28 -42 -31 55 -4 197 44 324 109 264 135 519 348 580 484 76 167 -79
277 -346 246 -116 -13 -256 -48 -340 -85 -65 -29 -78 -27 -49 7 318 358 407
473 483 623 113 226 60 320 -149 264z m155 -34 c14 -10 19 -25 18 -53 -3 -95
-90 -244 -268 -453 -58 -69 -133 -160 -168 -202 -34 -42 -64 -77 -68 -77 -3
-1 8 86 24 192 20 132 29 236 30 334 l2 142 90 43 c160 76 297 106 340 74z"
          />
          <path
            d="M1412 2661 c-140 -62 -231 -111 -397 -217 -71 -45 -142 -88 -157 -95
-16 -7 -28 -16 -28 -21 0 -30 47 -11 207 81 l176 101 -6 -192 c-4 -106 -18
-308 -33 -448 -33 -326 -36 -458 -10 -523 10 -27 17 -49 15 -50 -65 -42 -259
-230 -259 -251 0 -17 36 -2 64 27 43 46 244 206 375 299 l56 41 -39 -6 c-21
-3 -67 -24 -103 -47 -35 -22 -69 -40 -75 -40 -13 0 -4 253 12 379 19 147 40
421 46 630 l7 213 158 77 c87 42 158 79 158 84 2 19 -64 2 -167 -42z"
          />
          <path
            d="M2025 2678 c-3 -7 -18 -94 -35 -193 -17 -99 -32 -189 -35 -201 -3
-14 -24 -28 -67 -46 l-63 -26 -3 24 c-2 14 2 57 8 97 6 40 14 125 17 191 5 99
4 118 -8 114 -10 -3 -20 -56 -36 -189 -36 -287 -15 -248 -179 -333 -148 -76
-204 -111 -204 -127 0 -27 43 -15 181 50 84 39 153 70 154 69 2 -2 -1 -32 -6
-68 -25 -200 -69 -580 -69 -601 0 -14 6 -33 13 -43 14 -19 27 61 85 527 l27
212 63 33 c35 19 66 32 69 29 2 -3 -17 -133 -43 -289 -57 -342 -70 -538 -35
-538 4 0 15 44 24 98 40 238 116 710 119 736 3 28 12 34 183 109 186 81 244
115 174 103 -20 -4 -105 -33 -188 -65 l-151 -58 0 26 c0 14 7 71 15 126 8 55
15 121 15 147 0 28 5 48 13 51 9 3 9 9 1 23 -14 23 -33 29 -39 12z"
          />
          <path
            d="M2754 2606 c-3 -8 -1 -23 5 -33 11 -22 7 -72 -38 -468 -16 -143 -32
-303 -36 -355 -6 -93 -8 -99 -81 -244 -70 -140 -92 -216 -64 -216 6 0 10 8 10
18 1 20 41 110 90 201 27 50 35 59 41 45 5 -14 8 -9 14 21 9 47 55 114 123
177 56 53 88 72 108 64 11 -4 14 -34 14 -149 0 -161 14 -223 58 -258 23 -18
34 -19 92 -13 36 3 79 13 95 22 39 20 150 127 233 225 36 42 67 76 68 74 2 -2
-6 -31 -16 -66 -24 -76 -25 -103 -4 -146 21 -45 62 -62 113 -46 21 6 44 18 51
25 10 13 6 13 -26 4 -46 -12 -80 1 -94 37 -13 35 1 95 56 232 24 61 44 116 44
122 0 32 -40 -4 -161 -141 -219 -252 -273 -303 -306 -291 -31 11 4 137 69 247
45 76 147 185 199 212 32 16 33 16 51 -6 24 -30 37 -17 17 18 -21 38 -48 38
-121 1 -93 -47 -185 -145 -239 -255 -40 -79 -44 -94 -44 -161 0 -76 -9 -89
-37 -55 -26 29 -30 53 -39 199 -9 170 -22 202 -77 203 -39 0 -91 -30 -148 -86
-36 -35 -54 -47 -54 -36 0 10 11 96 25 192 62 441 76 648 46 683 -17 21 -30
22 -37 3z"
          />
          <path
            d="M3971 2467 c-13 -13 -15 -97 -3 -97 9 0 42 69 42 87 0 16 -26 23 -39
10z"
          />
          <path
            d="M2225 2077 c-18 -26 -19 -37 -4 -74 l11 -28 23 45 c12 24 21 50 18
56 -9 23 -32 23 -48 1z"
          />
          <path
            d="M3815 1957 c-13 -32 -88 -402 -98 -486 -12 -98 39 23 84 201 40 161
69 301 63 310 -12 18 -36 6 -49 -25z"
          />
          <path
            d="M2471 1889 c-102 -81 -181 -225 -181 -326 0 -56 30 -127 58 -142 34
-18 97 -13 123 9 l24 20 -32 -6 c-72 -14 -113 26 -113 109 0 116 123 314 207
332 54 12 56 14 43 30 -23 28 -74 18 -129 -26z"
          />
          <path
            d="M2142 1903 c-5 -10 -12 -85 -16 -168 -3 -82 -9 -193 -12 -245 -7
-108 5 -114 30 -15 30 118 48 382 30 429 -8 21 -21 20 -32 -1z"
          />
          <path
            d="M4049 1569 c-16 -10 -5 -35 24 -53 21 -14 31 -3 23 27 -7 28 -26 39
-47 26z"
          />
          </g>
        </svg>
      </AnimateSignatureSection>
    </>
  );
};

export default AnimateSignature;
