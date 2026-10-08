var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { jsx, jsxs } from "react/jsx-runtime";
import Heading from "@/components/heading";
import Text from "@/components/text";
import { cva } from "class-variance-authority";
import { Image } from "drupal-canvas";
const containerVariants = cva(
  "mx-auto flex w-full max-w-[1360px] gap-8 md:items-center",
  {
    variants: {
      layout: {
        text_image: "flex-col md:flex-row",
        image_text: "flex-col md:flex-row-reverse"
      }
    },
    defaultVariants: {
      layout: "text_image"
    }
  }
);
const textColumnVariants = cva(
  "flex flex-col items-start justify-center gap-4",
  {
    variants: {
      columnWidths: {
        "33_66": "w-full md:w-1/3",
        "50_50": "w-full md:w-1/2",
        "66_33": "w-full md:w-2/3"
      }
    },
    defaultVariants: {
      columnWidths: "50_50"
    }
  }
);
const imageColumnVariants = cva("flex w-full items-center", {
  variants: {
    columnWidths: {
      "33_66": "md:w-2/3",
      "50_50": "md:w-1/2",
      "66_33": "md:w-1/3"
    }
  },
  defaultVariants: {
    columnWidths: "50_50"
  }
});
const TwoColumnText = ({
  layout,
  columnWidths,
  preHeading,
  heading,
  headingElement,
  headingSize,
  text,
  buttons,
  textColor,
  image,
  rightColumn,
  textShadow
}) => {
  return /* @__PURE__ */ jsx("div", { className: "flex w-full justify-start bg-cover bg-center bg-no-repeat py-24", children: /* @__PURE__ */ jsx("div", { className: "mx-6 flex w-full items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: containerVariants({ layout }), children: [
    /* @__PURE__ */ jsxs("div", { className: textColumnVariants({ columnWidths }), children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(
        Heading,
        {
          heading,
          headingElement,
          headingSize,
          preHeading,
          textColor,
          textShadow
        }
      ) }),
      text && /* @__PURE__ */ jsx(
        Text,
        {
          className: "mb-4",
          text,
          textColor,
          textSize: "large",
          textShadow
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex w-full min-w-3xs gap-4", children: buttons })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: imageColumnVariants({ columnWidths }), children: [
      /* @__PURE__ */ jsx(ContentImage, { image, className: "h-auto w-full" }),
      rightColumn
    ] })
  ] }) }) });
};
const ContentImage = ({ image, className }) => {
  if (!image) {
    return null;
  }
  const { src, alt, width, height } = image;
  return /* @__PURE__ */ jsx(Image, __spreadProps(__spreadValues({}, { src, alt, width, height }), { className }));
};
export {
  TwoColumnText as default
};
