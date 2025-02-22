import React from "react";

type CommonRowCellProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLParagraphElement>
>;

const CommonRowCell: React.FC<CommonRowCellProps> = ({ children, ...rest }) => {
  return <p {...rest}>{children}</p>;
};

export default CommonRowCell;
