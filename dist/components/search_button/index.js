import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import SearchForm from "@/components/search_form";
import Section from "@/components/section";
const SearchButton = ({ positionTop = 50 }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        "aria-label": open ? "Close" : "Search",
        "aria-expanded": open,
        className: "rounded bg-blue-600 p-2.5 text-white",
        onClick: toggleOpen,
        children: [
          !open && /* @__PURE__ */ jsx(SearchIcon, {}),
          open && /* @__PURE__ */ jsx(CloseIcon, {})
        ]
      }
    ),
    open && /* @__PURE__ */ jsx(SearchOverlay, { positionTop })
  ] });
};
const SearchOverlay = ({ positionTop }) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "absolute right-0 left-0 bg-gray-100",
      style: { top: `${positionTop}px` },
      children: /* @__PURE__ */ jsx(Section, { content: /* @__PURE__ */ jsx(SearchForm, {}), width: "normal" })
    }
  );
};
const SearchIcon = () => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      "aria-hidden": "true",
      className: "h-4 w-4 stroke-white text-white",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z",
            stroke: "white",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M21 21L16.7 16.7",
            stroke: "white",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  );
};
const CloseIcon = () => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      "aria-hidden": "true",
      className: "h-4 w-4 stroke-white text-white",
      width: "24",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M15 5L5 15",
            stroke: "white",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M5 5L15 15",
            stroke: "white",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  );
};
export {
  SearchButton as default
};
