export type GlobalRoutes = {
  path: string;
  element?: JSX.Element | undefined;
  icon: JSX.Element;
  title: string;
  child?: GlobalRoutes[] | undefined;
};
