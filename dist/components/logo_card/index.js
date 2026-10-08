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
import { jsx } from "react/jsx-runtime";
import { Image } from "drupal-canvas";
const LogoCard = ({ backgroundColor = "#F1F5F9", image }) => {
  if (!(image == null ? void 0 : image.src)) {
    return null;
  }
  const { src, alt, width, height } = image;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "align-center flex max-h-33 max-w-50 flex-col justify-center gap-4 rounded-2xl p-6 leading-[normal]",
      style: { backgroundColor },
      children: /* @__PURE__ */ jsx(
        Image,
        __spreadProps(__spreadValues({}, { src, alt, width, height }), {
          className: "h-auto w-50 object-contain"
        })
      )
    }
  );
};
export {
  LogoCard as default
};
