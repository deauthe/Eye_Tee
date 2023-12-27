import React, { useState } from "react";
import EditorDesignCarasoul from "./EditorDesignCarasoul";
import ImageEditorPage from "../pages/image-editor/images";

const CommonParentComponent = () => {
  const [selectedMainImage, setSelectedMainImage] = useState("");

  const handleImageSelect = (imageSrc) => {
    setSelectedMainImage(imageSrc);
  };

  return (
    <>
      <EditorDesignCarasoul selectedMainImage={selectedMainImage} />
      <ImageEditorPage
        selectedMainImage={selectedMainImage}
        onImageSelect={handleImageSelect}
      />
    </>
  );
};

export default CommonParentComponent;
