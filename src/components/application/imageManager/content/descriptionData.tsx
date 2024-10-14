import { Tag, Link, Trash2 } from "react-feather";
import { Href } from "@/constant";
import { ImageManagerPropsType } from "@/types/imageManagerType";

const DescriptionData: React.FC<ImageManagerPropsType> = ({
  data,
  removeImage,
}) => {
  const { public_id, filename } = data;

  return (
    <div className="desciption-data">
      <div className="title-bookmark">
        <h5 className="title_0">{filename}</h5>
        {/* <p className="weburl_0">{secure_url}</p> */}
        <div className="hover-block">
          <ul>
            <li>
              <a href={Href}>
                <Link />
              </a>
            </li>
            <li>
              <a href={Href} onClick={() => removeImage(public_id)}>
                <Trash2 />
              </a>
            </li>
            <li className="text-end">
              <a href={Href}>
                <Tag />
              </a>
            </li>
            {/* <li>
              <a href={Href} onClick={() => onHandleClick(data)}>
                <Edit2 />
              </a>
            </li> */}
          </ul>
        </div>
        {/* <div className="content-general">
          <p className="desc_0">{data.desc}</p>
          <span className="collection_0">{data.collection}</span>
        </div> */}
      </div>
    </div>
  );
};

export default DescriptionData;
