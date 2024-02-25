/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid, Header } from "semantic-ui-react";
import PhotoWidgetDropZone from "./PhotoWidgetDropZone";
import { useEffect, useState } from "react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";

interface Props {
  uploadPhoto: (file: Blob) => void;
  loading: boolean;
}

const PhotoUploadWidget = ({ loading, uploadPhoto }: Props) => {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  const onCrop = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!));
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    }; // in order to clean up the memory of the user from the previewed images
  }, [files]);

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header color="teal" content="Step 1 - Add Photo" sub />
        <PhotoWidgetDropZone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header color="teal" content="Step 2 - Resize image" sub />
        {files && files.length > 0 && (
          <PhotoWidgetCropper
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header color="teal" content="Step 3 - Preview & Upload" sub />
        <>
          <div
            className="img-preview"
            style={{ minHeight: 200, overflow: "hidden" }}
          />
          {files && files.length > 0 && (
            <Button.Group widths={2}>
              <Button
                loading={loading}
                onClick={onCrop}
                positive
                icon="check"
              />
              <Button
                disabled={loading}
                onClick={() => setFiles([])}
                icon="close"
              />
            </Button.Group>
          )}
        </>
      </Grid.Column>
    </Grid>
  );
};

export default PhotoUploadWidget;
