import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

import type { ParentItemProps } from ".";

const ParentItem = ({ label, children }: ParentItemProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [childMaxHeight, setChildMaxHeight] = useState(300);
  const childRef = useRef<HTMLDivElement>(null);
  const currentChildHeight =
    childRef?.current?.getBoundingClientRect?.().height;

  useEffect(() => {
    if (childRef?.current) {
      setChildMaxHeight(childRef.current.getBoundingClientRect().height);
    }
  }, [currentChildHeight]);

  return (
    <>
      <button
        onClick={() => setIsOpened((prev) => !prev)}
        className="w-full flex justify-between items-center hover:bg-secondary p-1"
      >
        <span className="mr-3 text-foreground">{label}</span>
        <ChevronDown
          className={`w-4 h-4 transition duration-300 text-foreground${
            isOpened ? " rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300`}
        style={{ maxHeight: isOpened ? `${childMaxHeight}px` : "0" }}
      >
        <div ref={childRef}>{children}</div>
      </div>
    </>
  );
};

export default ParentItem;
