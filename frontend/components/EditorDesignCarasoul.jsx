import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {Switch} from "@nextui-org/react";

const EditorDesignCarasoul = () => {
    const [isSelected, setIsSelected] = React.useState(true);
    return (
        <div className= " text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
                  <div className="absolute right-1 top-3 z-40 gap-2 flex mr-4 items-center border-2 border-black p-1 px-2 rounded-full bg-zinc-300">
                    <span className="text-black text-sm">Front</span><Switch className="" isSelected={isSelected} onValueChange={setIsSelected}></Switch><span className="text-black text-sm ml-[-7px]">Back</span>
    
                  </div>
            <Carousel
                infiniteLoop={true}
                showIndicators={false}
                showStatus={false}
                thumbWidth={60}
                className="productCarousel"
            >
                
                <img src="/p2.png" />
                <img src="/p3.png" />
                <img src="/p4.png" />
                <img src="/p5.png" />
                <img src="/p6.png" />
                <img src="/p7.png" />
               
            </Carousel>

        </div>
    );
};

export default EditorDesignCarasoul;
