import { ReactNode } from 'react';

interface IPageTitleProps {
  children: ReactNode;
}

export const PageTitle = ({ children }: IPageTitleProps) => {
  return <h1>{children}</h1>;
};
