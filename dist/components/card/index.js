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
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import Button from "@/components/button";
import Heading from "@/components/heading";
import { cva } from "class-variance-authority";
import { Image, FormattedText, cn } from "drupal-canvas";
const cardVariants = cva(
  "flex w-full max-w-md flex-col items-center gap-4 rounded-2xl pb-6 leading-[normal]",
  {
    variants: {
      layout: {
        left_aligned: "items-start text-left",
        center_aligned: "items-center text-center",
        right_aligned: "items-end text-right"
      },
      textColor: {
        Default: null,
        Dark: "text-primary-dark",
        Light: "text-white"
      },
      image: {
        true: null,
        false: "pt-8"
      }
    },
    defaultVariants: {
      textColor: "Default"
    }
  }
);
const Card = ({
  backgroundColor = "#ffffff",
  backgroundColorOnHover = "#E2E8F0",
  byline,
  className,
  image,
  heading,
  headingElement = "h2",
  layout = "left_aligned",
  link,
  linkLabel,
  linkVariant = "link",
  text,
  textColor
}) => {
  const cardBackgroundClassName = `card-${backgroundColor.substring(1)}`;
  const cardBackgroundClassNameOnHover = `card-${backgroundColorOnHover.substring(1)}`;
  const { src, alt, width, height } = image != null ? image : {};
  const hasImage = !!src;
  const cardContent = /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        cardVariants({ layout, textColor, image: hasImage }),
        cardBackgroundClassName,
        cardBackgroundClassNameOnHover,
        className
      ),
      children: [
        hasImage && /* @__PURE__ */ jsx(
          Image,
          __spreadProps(__spreadValues({}, { src, alt, width, height }), {
            className: "w-full rounded-2xl object-cover object-center"
          })
        ),
        /* @__PURE__ */ jsxs("div", { className: "px-6 pt-2", children: [
          heading && /* @__PURE__ */ jsx(
            Heading,
            {
              className: "mb-2",
              heading,
              headingElement,
              headingSize: "small",
              layout,
              textColor
            }
          ),
          byline && /* @__PURE__ */ jsx("div", { className: "mt-3 mb-2 text-xs font-semibold text-gray-500", children: byline }),
          text && /* @__PURE__ */ jsx(FormattedText, { className: "mb-4 leading-6", children: text }),
          link && linkLabel && /* @__PURE__ */ jsx(Button, { link, variant: linkVariant, children: linkLabel })
        ] })
      ]
    }
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", { children: `
          .${cardBackgroundClassName} {
            background-color: ${backgroundColor};
          }
          .${cardBackgroundClassNameOnHover}:hover {
            background-color: ${backgroundColorOnHover};
          }
        ` }),
    link && !linkLabel ? /* @__PURE__ */ jsx("a", { href: link, children: cardContent }) : cardContent
  ] });
};
export {
  Card as default
};
