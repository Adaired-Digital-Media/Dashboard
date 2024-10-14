export type BodyDataItem = {
    id: string; 
    componentName: string;
    label?:string;
    body: { [inputName: string]: any };
  };
  