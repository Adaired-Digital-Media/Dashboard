export interface ImageType {
    asset_id: string;
    public_id: string;
    folder: string;
    filename: string;
    secure_url: string;
    url: string;
  }
export interface ImageManagerPropsType {
    data: ImageType;
    // onHandleClick: (book: BookMarkData) => void;
    removeImage: (public_id: string) => void;
  }