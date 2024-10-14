"use client";
import CommonModal from "@/components/uiKits/modal/common/commonModal";
import { useEffect, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import SelectorTab from "./selectorTab";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface ImageSelectorProps {
  imageName?: string;
  imageUrl?: string;
  className?: string;
  onImageSelect: (image: string) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
  imageName,
  imageUrl,
  className = "",
  onImageSelect,
}) => {
  const [extraLargeScreen, setExtraLargeScreen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (imageUrl) {
      // Convert the imageUrl to a File object and set it in FilePond
      fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const file = new File([blob], imageName || "Selected Image", {
            type: blob.type,
          });
          setFiles([file]); // Update FilePond with the selected file
        });
    }
  }, [imageUrl, imageName]);

  const extraLargeScreenToggle = () => setExtraLargeScreen(!extraLargeScreen);

  const handleImageSelect = (secure_url: string) => {
    onImageSelect(secure_url);
    extraLargeScreenToggle();

    // Convert URL to File and set it in FilePond
    fetch(secure_url)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], "Selected Image", {
          type: blob.type,
        });
        setFiles([file]); // Update FilePond with the selected file
      });
  };

  return (
    <div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          extraLargeScreenToggle();
        }}
        style={{ cursor: "pointer" }}
      >
        <FilePond
          files={files}
          onupdatefiles={(fileItems) => {
            const updatedFiles = fileItems.map(
              (fileItem) => fileItem.file as File
            );
            if (updatedFiles.length > 0 && !files.length) {
              setFiles(updatedFiles);
            }
          }}
          allowMultiple={false}
          maxFiles={1}
          disabled={files.length > 0 ? false : true}
          onremovefile={(fileItem) => {
            setFiles([]);
          }}
          allowReorder={false}
          labelIdle='<span class="filepond--label-action text-danger text-decoration-none">Upload Image</span>'
          className={className}
        />
      </div>

      <CommonModal
        size="xl"
        isOpen={extraLargeScreen}
        toggle={extraLargeScreenToggle}
        sizeTitle="Image Selector"
      >
        <SelectorTab onImageSelect={handleImageSelect} />
      </CommonModal>
    </div>
  );
};

export default ImageSelector;
