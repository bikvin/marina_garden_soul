"use client";

import { useEffect, useState } from "react";

export default function Parallax({
  imageLink,
  hero = false,
  children,
  height = 400,
}: {
  imageLink: string;
  hero?: boolean;
  children?: JSX.Element | JSX.Element[];
  height?: number;
}) {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect if the user is on iOS
    function isIOS() {
      const userAgent = navigator.userAgent || navigator.vendor;

      // Check if the device is an iPhone or iPod
      const iPhoneOrIPod = /iPhone|iPod/.test(userAgent);

      // Check if the device is an iPad
      const iPad =
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) ||
        /iPad/.test(userAgent);

      // Return true if either condition is met
      return iPhoneOrIPod || iPad;
    }

    if (isIOS()) {
      // Add the 'ios' class to the body
      // document.body.classList.add("ios");
      setIsIOS(true);
    }

    // Optional: Remove the 'ios' class on component unmount (cleanup)
    return () => {
      // document.body.classList.remove("ios");
      setIsIOS(false);
    };
  }, []); // Empty dependency array ensures it runs only once on mount

  const isIosClass = isIOS ? "bg-scroll" : ""; // background-attachment: scroll;
  const isHeroClass = hero ? "hero-parallax" : "";

  return (
    <section
      className={`bg-fixed bg-center bg-no-repeat bg-cover flex items-center justify-center ${isIosClass} ${isHeroClass}`}
      style={{ minHeight: `${height}px`, backgroundImage: `url(${imageLink})` }}
    >
      <>{children}</>
    </section>
  );
}
