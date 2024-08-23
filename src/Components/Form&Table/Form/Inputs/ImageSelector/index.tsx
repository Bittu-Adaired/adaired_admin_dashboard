import CommonModal from "@/Components/UiKits/Modal/Common/CommonModal";
import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import SelectorTab from "./SelectorTab";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface ImageSelectorProps {
  imageName?: string;
  onImageSelect: (image: string) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
  imageName,
  onImageSelect,
}) => {
  const [extraLargeScreen, setExtraLargeScreen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

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
        console.log(file);
      });
  };

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation(); // Prevent event from bubbling up
          extraLargeScreenToggle(); // Toggle the modal
        }}
        style={{ cursor: "pointer" }}
      >
        <FilePond
          disabled={
            files.length > 0 ? false : true // Disable FilePond if an image is already selected
          }
          onremovefile={(fileItem) => {
            // Remove the selected image from FilePond
            setFiles([]);
            // setValue(""); // Reset the image name
          }}
          files={files}
          allowReorder={false}
          allowMultiple={false}
          maxFiles={1}
          onupdatefiles={(fileItems) => {
            // Only update state if there is a change in files
            const updatedFiles = fileItems.map(
              (fileItem) => fileItem.file as File
            );
            if (updatedFiles.length > 0 && !files.length) {
              setFiles(updatedFiles); // Update only if files are empty
            }
          }}
          labelIdle='Select image from <span class="filepond--label-action text-danger text-decoration-none">Media list</span> or <span class="filepond--label-action text-danger text-decoration-none">Upload</span> a new file'
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
    </>
  );
};

export default ImageSelector;
