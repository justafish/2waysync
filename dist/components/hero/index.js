import { jsx } from "react/jsx-runtime";
import TwoColumnText from "@/components/two_column_text";
import { cva } from "class-variance-authority";
const backgroundVariants = cva("align-center h-full w-full px-8 py-16", {
  variants: {
    darkenImage: {
      false: null,
      true: "backdrop-brightness-75"
    }
  }
});
const Hero = ({
  layout,
  preHeading,
  heading,
  headingElement,
  headingSize = "large",
  text,
  textColor = "dark",
  buttons,
  backgroundImage,
  darkenImage
}) => {
  const backgroundImageUrl = (backgroundImage == null ? void 0 : backgroundImage.src) ? `url(${backgroundImage.src})` : void 0;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "flex min-h-[672px] w-full justify-start bg-cover bg-center bg-no-repeat",
      style: backgroundImageUrl ? { backgroundImage: backgroundImageUrl } : void 0,
      children: /* @__PURE__ */ jsx("div", { className: backgroundVariants({ darkenImage }), children: /* @__PURE__ */ jsx(
        TwoColumnText,
        {
          heading,
          headingElement,
          headingSize,
          layout,
          preHeading,
          text,
          textColor,
          buttons,
          textShadow: "medium"
        }
      ) })
    }
  );
};
export {
  Hero as default
};
