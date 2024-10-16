export type BodyDataItem = {
  id: string;
  componentName: string;
  label?: string;
  body: { [inputName: string]: any };
};

export interface CommonErrorPageType {
  error: string;
  color: string;
  src: string;
}
