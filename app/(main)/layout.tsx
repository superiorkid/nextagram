import React from "react";

interface Props {
  children: React.ReactNode;
}

const MainLayuot = ({ children }: Props) => {
  return <div>{children}</div>;
};  
    
export default MainLayuot;
