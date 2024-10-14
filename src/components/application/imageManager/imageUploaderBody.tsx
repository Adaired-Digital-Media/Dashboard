"use client";
import React, { useState, useEffect } from "react";
import { Button, Toast, ToastBody } from "reactstrap";
import { RootState } from "@/redux/store";
import { uploadImages, resetUploadState } from "@/redux/reducers/imageSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Dropzone,
  ExtFile,
  FileMosaic,
  FileMosaicProps,
  FullScreen,
  ImagePreview,
} from "@dropzone-ui/react";

const ImageUploadBody = () => {
  const [extFiles, setExtFiles] = useState<ExtFile[]>([]);
  const [imageSrc, setImageSrc] = useState<File | string | undefined>(
    undefined
  );
  const [showLoadingToast, setShowLoadingToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const dispatch = useAppDispatch();
  const { isLoading, success } = useAppSelector(
    (state: RootState) => state.image
  );

  const updateFiles = (incomingFiles: ExtFile[]) => {
    setExtFiles(incomingFiles);
  };

  const onDelete = (id: FileMosaicProps["id"]) => {
    setExtFiles(extFiles.filter((x) => x.id !== id));
  };

  const handleSee = (imageSource: File | string | undefined) =>
    setImageSrc(imageSource);

  const handleAbort = (id: FileMosaicProps["id"]) => {
    setExtFiles(
      extFiles.map((ef) =>
        ef.id === id ? { ...ef, uploadStatus: "aborted" } : ef
      )
    );
  };

  const handleCancel = (id: FileMosaicProps["id"]) => {
    setExtFiles(
      extFiles.map((ef) =>
        ef.id === id ? { ...ef, uploadStatus: undefined } : ef
      )
    );
  };

  const onSubmit = async () => {
    try {
      const filesToUpload = extFiles
        .map((extFile) => extFile.file)
        .filter(Boolean) as File[];
      dispatch(uploadImages(filesToUpload));
      setShowLoadingToast(true);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  useEffect(() => {
    if (isLoading) {
      setShowLoadingToast(true);
    } else {
      setShowLoadingToast(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (success) {
      setShowSuccessToast(true);
      setExtFiles([]); // Clear files only if upload is successful
      dispatch(resetUploadState()); // Reset state
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => {
        setShowSuccessToast(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessToast]);

  return (
    <div className="m-b-10">
      <div className="toast-container position-fixed top-0 end-0 p-3 toast-index toast-rtl">
        {showLoadingToast && (
          <Toast fade isOpen={showLoadingToast}>
            <div className="toast-header toast-img">
              <strong className="me-auto txt-success">Uploading</strong>
              <Button close onClick={() => setShowLoadingToast(false)}></Button>
            </div>
            <ToastBody className="toast-dark">
              Please wait, images are uploading...
            </ToastBody>
          </Toast>
        )}
        {showSuccessToast && (
          <Toast fade isOpen={showSuccessToast}>
            <div className="toast-header toast-img">
              <strong className="me-auto txt-success">Success!</strong>
              <Button close onClick={() => setShowSuccessToast(false)}></Button>
            </div>
            <ToastBody className="toast-dark">
              Images uploaded successfully!
            </ToastBody>
          </Toast>
        )}
      </div>

      <Dropzone onChange={updateFiles} value={extFiles} header={false}>
        {extFiles.map((file) => (
          <FileMosaic
            {...file}
            key={file.id}
            onDelete={onDelete}
            onSee={handleSee}
            onAbort={handleAbort}
            onCancel={handleCancel}
            resultOnTooltip
            alwaysActive
            preview
          />
        ))}
        {extFiles.length === 0 && (
          <div className="dz-message needsclick">
            <i className="icon-cloud-up fs-1 txt-primary"></i>
            <h6 className="f-w-700 mb-1">
              Drop files here or click to upload.
            </h6>
            <h6 className="note needsclick">
              (You can upload more than <strong>one</strong> image at a time.)
            </h6>
          </div>
        )}
      </Dropzone>

      <FullScreen
        open={imageSrc !== undefined}
        onClose={() => setImageSrc(undefined)}
      >
        <ImagePreview src={imageSrc} />
      </FullScreen>

      <div className="btn-showcase text-end mt-4">
        <Button color="primary" onClick={onSubmit}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default ImageUploadBody;
