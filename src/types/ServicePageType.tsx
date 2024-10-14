export type BodyDataItem = {
    id: string; // Add id field
    componentName: string;
    label?:string;
    body: { [inputName: string]: any };
  };
  