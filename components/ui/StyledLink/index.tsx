import Link from "next/link";

interface StyledLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const StyledLink: React.FC<StyledLinkProps> = ({
  href,
  children,
  className = "",
  ...rest
}) => (
  <Link
    href={href}
    className={`self-center text-primary hover:underline ${className}`}
    {...rest}
  >
    {children}
  </Link>
);

export default StyledLink;
