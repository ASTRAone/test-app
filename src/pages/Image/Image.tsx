import React, { useRef, useState } from "react";
import ReactCrop, { PixelCrop, type Crop } from "react-image-crop";
import { useStyles } from "../../hooks/useStyles";
import styles from "./styles.module.scss";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDebounceEffect } from "../../hooks/useDebouneEffect";
import { canvasPreview } from "../../components/CanvasPreview/CanvasPreview";

export const Image: React.FC = () => {
  const cx = useStyles(styles);
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      setCompletedCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onDownloadCropClick = () => {
    if (!previewCanvasRef.current) {
      throw new Error("Crop canvas does not exist");
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        throw new Error("Failed to create blob");
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      blobUrlRef.current = URL.createObjectURL(blob);
      hiddenAnchorRef.current!.href = blobUrlRef.current;
      hiddenAnchorRef.current!.click();
    });
  };

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop]
  );

  return (
    <div className={cx("app")}>
      <div className={cx("container")}>
        <h3 className={cx("title")}>Change Image Crop</h3>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          href="#file-upload"
        >
          Upload a file
          <input type="file" className={cx("input")} onChange={onSelectFile} />
        </Button>
        {!!imgSrc && (
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            minWidth={200}
            minHeight={200}
          >
            <img ref={imgRef} alt="Crop me" src={imgSrc} />
          </ReactCrop>
        )}

        {!!completedCrop && !!previewCanvasRef && (
          <>
            <div className={cx("canvas")}>
              <canvas
                ref={previewCanvasRef}
                style={{
                  border: "1px solid black",
                  objectFit: "contain",
                  width: completedCrop.width,
                  height: completedCrop.height,
                }}
              />
            </div>
          </>
        )}
        {completedCrop && (
          <Button variant="contained" onClick={onDownloadCropClick}>
            Download Image
          </Button>
        )}

        <a
          href="#hidden"
          ref={hiddenAnchorRef}
          download
          style={{
            position: "absolute",
            visibility: "hidden",
          }}
        >
          Hidden download
        </a>
      </div>
    </div>
  );
};
