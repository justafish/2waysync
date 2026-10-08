import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { getPageData } from "drupal-canvas";
const Breadcrumb = () => {
  const { breadcrumbs } = getPageData();
  const links = Array.from(breadcrumbs);
  return links && /* @__PURE__ */ jsxs("nav", { role: "navigation", "aria-labelledby": "system-breadcrumb", children: [
    /* @__PURE__ */ jsx("h2", { id: "system-breadcrumb", className: "sr-only", children: "Breadcrumb" }),
    /* @__PURE__ */ jsx("ol", { className: "flex items-center whitespace-nowrap", children: links.map(({ key, text, url }, index) => /* @__PURE__ */ jsxs("li", { className: "inline-flex items-center", children: [
      url ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
        "a",
        {
          href: url,
          className: "flex items-center text-sm text-gray-500 hover:text-blue-600 focus:text-blue-600 focus:outline-none dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500",
          children: text
        }
      ) }) : /* @__PURE__ */ jsx("span", { className: "inline-flex items-center truncate text-sm font-semibold text-gray-800 dark:text-neutral-200", children: text }),
      index !== links.length - 1 && /* @__PURE__ */ jsx(
        "svg",
        {
          className: "mx-2 size-4 shrink-0 text-gray-400 dark:text-neutral-600",
          xmlns: "http://www.w3.org/2000/svg",
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: /* @__PURE__ */ jsx("path", { d: "m9 18 6-6-6-6" })
        }
      )
    ] }, key)) })
  ] });
};
export {
  Breadcrumb as default
};
