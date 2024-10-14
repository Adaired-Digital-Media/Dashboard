export type ServiceFormTypes = {
    _id: string;
    metaTitle: string;
    metaDescription: string;
    canonicalLink: string;
    openGraphImage?: string; 
    robotsText?: string; 
    focusKeyword: string;
    serviceName: string;
    slug: string;
    colorScheme: string;
    parentService?: string | null; 
    status: "publish" | "draft";
    childServices: Array<{
      childServiceId: string;
    }>; 
    bodyData: Array<Record<string, unknown>>;  
  };
  