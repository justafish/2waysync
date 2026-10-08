import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import SearchButton from "@/components/search_button";
import { cva } from "class-variance-authority";
import { cn } from "drupal-canvas";
const headerVariants = cva(
  cn(
    "relative grid w-full justify-center gap-4 px-8 py-3 leading-[normal]",
    "border-b border-solid border-gray-200",
    "bg-[var(--color-bg)]"
  ),
  {
    variants: {
      displaySearchForm: {
        false: "grid-cols-2",
        true: "grid-cols-2 md:grid-cols-[1fr_auto_1fr]"
      }
    }
  }
);
const Header = ({
  backgroundColor = "#ffffff",
  className,
  logo,
  menu,
  displaySearchForm
}) => {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        setHeight(ref.current.offsetHeight);
      }
    };
    updateHeight();
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, []);
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: cn(headerVariants({ displaySearchForm }), className),
      ref,
      style: {
        "--color-bg": backgroundColor
      },
      children: [
        /* @__PURE__ */ jsx("div", { className: "my-1 max-h-8 min-w-[100px] justify-self-start md:my-3", children: logo }),
        /* @__PURE__ */ jsxs("div", { className: "flex w-full min-w-[200px] items-center justify-end gap-2 justify-self-end md:min-w-[300px] md:content-center md:justify-center md:justify-self-center md:px-6 md:py-2", children: [
          displaySearchForm && /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx(SearchButton, { positionTop: height }) }),
          /* @__PURE__ */ jsx("div", { className: "md:w-full", children: menu })
        ] }),
        displaySearchForm && /* @__PURE__ */ jsx("div", { className: "hidden min-w-[50px] content-center text-right md:block", children: /* @__PURE__ */ jsx(SearchButton, { positionTop: height }) })
      ]
    }
  );
};
export {
  Header as default
};
