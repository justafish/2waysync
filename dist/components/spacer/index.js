import { jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
const spacerVariants = cva("", {
  variants: {
    height: {
      small: "h-8",
      medium: "h-12",
      large: "h-16",
      extra_large: "h-24"
    }
  }
});
const Spacer = ({ height = "small" }) => {
  return /* @__PURE__ */ jsx("div", { className: spacerVariants({ height }), children: " " });
};
export {
  Spacer as default
};
