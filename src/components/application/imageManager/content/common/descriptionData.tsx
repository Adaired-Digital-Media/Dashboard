import { Link, Trash2, Edit2 } from "react-feather";
import { ImageManagerPropsType } from "@/types/imageManagerType";
import CopyToClipboard from "react-copy-to-clipboard";
import Swal from "sweetalert2";

const DescriptionData: React.FC<ImageManagerPropsType> = ({
  data,
  removeImage,
  // onHandleClick,
}) => {
  const { secure_url, public_id, filename } = data;

  return (
    <div className="desciption-data">
      <div className="title-bookmark">
        <h5 className="title_0">{filename}</h5>
        <p className="weburl_0">{secure_url}</p>
        <div className="hover-block">
          <ul>
            <li
              className="pointer"
              // onClick={onHandleClick}
            >
              <Edit2 />
            </li>
            <li className="pointer">
              <CopyToClipboard
                text={secure_url}
                onCopy={() => {
                  Swal.fire({
                    title: "Copied!",
                    text: "URL has been copied to clipboard.",
                    icon: "success",
                    confirmButtonText: "Cool",
                  });
                }}
              >
                <Link />
              </CopyToClipboard>
            </li>
            <li onClick={() => removeImage(public_id)} className="pointer">
              <Trash2 />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DescriptionData;
