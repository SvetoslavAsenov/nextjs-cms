import Item from "./Item";

export type BreadcrumbsItem = {
  label: string;
  href?: string;
  first?: boolean;
  icon?: React.ReactElement;
};

type BreadcrumbsProps = {
  items: BreadcrumbsItem[];
};

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="bg-background flex gap-[0.25rem] flex-wrap select-none">
      {items.map((item, index) => (
        <Item key={index} {...item} first={index === 0} />
      ))}
    </nav>
  );
};

export default Breadcrumbs;
