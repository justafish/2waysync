import { jsxs, jsx } from "react/jsx-runtime";
import GridContainer from "@/components/grid_container";
import Heading from "@/components/heading";
import { cn } from "drupal-canvas";
const ThreeColumnCardContainer = ({
  className,
  headingPosition,
  heading,
  headingElement,
  headingSize = "large",
  preHeading,
  textColor,
  layout,
  content
}) => {
  return /* @__PURE__ */ jsxs("div", { className: cn("mx-6 flex flex-col items-center gap-16", className), children: [
    heading ? /* @__PURE__ */ jsx(
      Heading,
      {
        heading,
        headingElement,
        headingSize,
        layout: headingPosition,
        preHeading,
        textColor
      }
    ) : null,
    /* @__PURE__ */ jsx(GridContainer, { content, layout })
  ] });
};
export {
  ThreeColumnCardContainer as default
};
