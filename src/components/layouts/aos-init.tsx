"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 750,
      once: false,
      easing: "ease-in-quad",
    });
  }, []);

  return null;
}