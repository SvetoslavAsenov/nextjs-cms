import Link from "next/link";

interface StyledLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const StyledLink: React.FC<StyledLinkProps> = ({
  href,
  children,
  className = "",
}) => (
  <Link
    href={href}
    className={`self-center text-primary hover:underline ${className}`}
  >
    {children}
  </Link>
);

export default StyledLink;
