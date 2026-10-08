import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { FormattedText } from "drupal-canvas";
const blockquoteVariants = cva("my-8 flex w-full flex-col leading-[normal]", {
  variants: {
    textColor: {
      dark: "",
      light: "text-white"
    }
  }
});
const nameVariants = cva(
  "flex items-end self-stretch pt-5 leading-6 font-bold whitespace-pre-wrap",
  {
    variants: {
      textColor: {
        dark: "",
        light: "text-white"
      }
    }
  }
);
const titleVariants = cva("text-sm leading-5 whitespace-pre-wrap", {
  variants: {
    textColor: {
      dark: "text-gray-500",
      light: "text-gray-200"
    }
  }
});
const Blockquote = ({ text, textColor, name, title }) => {
  return /* @__PURE__ */ jsx("div", { className: blockquoteVariants({ textColor }), children: /* @__PURE__ */ jsxs("div", { className: "flex flex-grow justify-center gap-6", children: [
    /* @__PURE__ */ jsx("div", { className: "w-1 bg-gray-200" }),
    /* @__PURE__ */ jsxs("div", { className: "flex-grow font-medium", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-start self-stretch text-xl leading-8", children: /* @__PURE__ */ jsx(FormattedText, { children: text }) }),
      name && /* @__PURE__ */ jsx("div", { className: nameVariants({ textColor }), children: name }),
      title && /* @__PURE__ */ jsx("div", { className: titleVariants({ textColor }), children: title })
    ] })
  ] }) });
};
export {
  Blockquote as default
};
