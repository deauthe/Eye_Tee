import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import EditorDesignCarasoul from "@/components/EditorDesignCarasoul.jsx";
import CustomTextComponent from "@/components/CustomTextComponent";
import CategoryCard from "@/components/CategoryCard";

const DesignInfo = [
  {
    designName: "Abstract Waves",
    description:
      "A mesmerizing design inspired by ocean waves and abstract patterns.",
    designerName: "John Doe",
    tags: ["abstract", "waves", "ocean", "art"],
  },
];

function ImageEditor() {
  const router = useRouter();
  const designImg = router.query.url || "";
  const category = router.query.category || "";
  const [canvasCaptureProps, setCanvasCaptureProps] = useState({
    mainImage: null,
    overlayImage: null,
    overlayScale: 1,
    overlayPosition: { x: 0, y: 0 },
    rotationAngle: 0,
  });

  return (
    <div className="w-full max-w-[1100px] px-5 md:px-3 mx-auto">
      <div className="flex  justify-between mx-8 mt-10  mb-5 ">
        <div className="grid grid-row-7 bg-zinc-300 w-[26em] rounded-[30px]">
          <div className="row-span-4 flex justify-center items-center object-contain">
            <div className=" bg-gray-200 w-[90%] flex items-center justify-center h-[90%] rounded-lg shadow-none">
              <Image
                src={designImg}
                width={200}
                height={200}
                alt="designImage"
              />
            </div>
          </div>
        
          <div className="row-span-3">
            {DesignInfo.map((e) => (
              <div className="mx-7 flex flex-col gap-3">
                <p className="text-2xl font-bold text-slate-700" >{e.designName}</p>
                <p className="text-slate-600">{e.description}</p>
                <p className=" text-slate-600 font-bold">Created By {e.designerName}</p>
                <div className=" text-sm flex gap-3 flex-wrap font-bold">
                  {
                    e.tags.map((c)=>(
                      <p>#{c}</p>
                    ))
                  }
                </div>
              </div>
            ))}
            {/* <div className="flex items-center justify-center text-4xl">
              <p>Eye Eye Tee</p>
            </div> */}
          </div>
        </div>

        <div className="editor  flex flex-col  mr-[5em]">
          <EditorDesignCarasoul />
        </div>
      </div>
      <div className="mx-8 mt-9">
        <CustomTextComponent fontSize="35px">
          Explore These Categories
        </CustomTextComponent>
      </div>

      <div className="mx-8 mb-9">
        <div className="flex gap-4">
          {["hoodie", "shirt", "tshirt", "cup"].map((category, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center bg-white/95 shadow-sm rounded-[30px] inline-block w-[230px] p-5 bg-red-300 border-3 border-zinc-600"
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageEditor;
