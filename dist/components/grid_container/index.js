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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
import { jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { cn } from "drupal-canvas";
const gridVariants = cva("grid w-full", {
  variants: {
    layout: {
      "50-50": "md:grid-cols-[1fr_1fr]",
      "33-33-33": "md:grid-cols-[1fr_1fr_1fr]",
      "75-25": "md:grid-cols-[3fr_1fr]",
      "25-75": "md:grid-cols-[1fr_3fr]",
      "67-33": "md:grid-cols-[2fr_1fr]",
      "33-67": "md:grid-cols-[1fr_2fr]",
      "50-25-25": "md:grid-cols-[2fr_1fr_1fr]",
      "25-25-50": "md:grid-cols-[1fr_1fr_2fr]",
      "25-25-25-25": "sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr]"
    },
    gap: {
      extra_small: "gap-1",
      small: "gap-2",
      medium: "gap-4",
      large: "gap-6",
      extra_large: "gap-8"
    }
  },
  defaultVariants: {
    gap: "medium",
    layout: "33-33-33"
  }
});
const GridContainer = (_a) => {
  var _b = _a, { layout, gap, className, content } = _b, props = __objRest(_b, ["layout", "gap", "className", "content"]);
  return /* @__PURE__ */ jsx("div", { className: "mx-auto w-full max-w-[1360px] px-6", children: /* @__PURE__ */ jsx(
    "div",
    __spreadProps(__spreadValues({
      className: cn(gridVariants({ layout, gap, className }), className)
    }, props), {
      children: content
    })
  ) });
};
export {
  GridContainer as default
};
