export type BodyDataItem = {
  id: string; // Add id field
  componentName: string;
  body: { [inputName: string]: any };
};
