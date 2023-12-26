import { ReactNode } from "react";

interface AlertProps {
  children: ReactNode;
}

const Alert = ({ children }: AlertProps) => {
  return (
    <div className="alert alert-primary alert-dismissible fade show">
      {children}
      <button className="btn-close" data-bs-dismiss="alert" />
    </div>
  );
};

export default Alert;
