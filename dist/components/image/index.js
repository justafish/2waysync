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
import { Image as Image$1 } from "drupal-canvas";
const Image = ({ image }) => {
  if (!(image == null ? void 0 : image.src)) {
    return null;
  }
  const { src, alt, width, height } = image;
  return /* @__PURE__ */ jsx(
    Image$1,
    __spreadProps(__spreadValues({}, { src, alt, width, height }), {
      className: "my-8 max-w-full"
    })
  );
};
export {
  Image as default
};
