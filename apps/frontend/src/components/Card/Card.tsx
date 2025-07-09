import { CardProps } from "./Card.types";
import "./Card.module.css";

export const Card = ({title, children, footer}: CardProps) => {
  return (
    <div className="card">
      {title && <h2 className="card-title">{title}</h2>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};
