import react, { useState, useEffect } from "react";
import { Dimensions } from "react-native";

export default function useGraficConstans() {
  const { width: originalOrientation } = Dimensions.get("window");
  const [width, setWidth] = useState(originalOrientation);
  const height = 200;
  const margin = { top: 10, right: 10, bottom: 20, left: 25 };

  useEffect(() => {
    const subscripcion = Dimensions.addEventListener("change", (e) => {
      const orientation = e.window.width;
      setWidth(orientation);
    });

    return () => subscripcion?.remove();
  }, []);

  return {
    margin,
    width,
    height,
  };
}
