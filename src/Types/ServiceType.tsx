export type ServiceFormTypes = {
  _id: string;
  metaTitle: string;
  metaDescription: string;
  canonicalLink: string;
  openGraphImage?: string; // Optional
  robotsText?: string; // Optional, with a default value
  focusKeyword: string;
  serviceName: string;
  slug: string;
  colorScheme: string;
  parentService?: string | null; // String or null
  status: "publish" | "draft";
  childServices: Array<{
    childServiceId: string;
  }>; // Array of objects with childServiceId as string
  bodyData: Array<Record<string, any>>; // Array of objects with any shape
};
