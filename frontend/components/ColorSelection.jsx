// ColorSelection.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const ColorSelection = ({ onColorChange, category }) => {
  const [colors, setColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/product/getColor?category=${category}`,
          {
            headers: {
              "x-api-key": "token",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setColors(data.colors);
        } else {
          console.error("Failed to fetch colors");
        }
      } catch (error) {
        console.error("Error fetching colors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchColors();
  }, [category]);

  const handleColorChange = (color) => {
    setSelectedColors((prevSelectedColors) => [...prevSelectedColors, color]);
    toast.success("Fetching color");
    onColorChange(color);
  };

  if (loading) {
    return <div>Loading colors...</div>;
  }

  return (
    <div className="flex items-center space-x-4">
      {colors.map((color, index) => (
        <div
          key={index}
          className={`w-[5em] h-[2em] cursor-pointer rounded-full`}
          style={{ backgroundColor: color }}
          onClick={() => handleColorChange(color)}
        ></div>
      ))}
    </div>
  );
};

export default ColorSelection;
