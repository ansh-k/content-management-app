export interface IViewFormProps {
  pageData: {
    name: string;
    url: string;
    description: string;
    image: string;
    textResources: Array<[]>;
    createdAt: string;
    updatedAt: string;
  };
  t: any;
  isLoading: boolean;
}
