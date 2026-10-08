import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { JsonApiClient, sortMenu, cn } from "drupal-canvas";
import useSWR from "swr";
const client = new JsonApiClient();
const MainNavigation = () => {
  const { data, error, isLoading } = useSWR(
    ["menu_items", "main"],
    ([type, resourceId]) => client.getResource(type, resourceId)
  );
  const links = !error && !isLoading ? Array.from(sortMenu(data)) : [];
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-end md:!hidden", children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: "relative flex size-9 items-center justify-center rounded-lg border text-sm font-semibold text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none",
        "aria-expanded": open,
        "aria-label": "Toggle navigation",
        onClick: () => {
          setOpen(!open);
        },
        children: [
          /* @__PURE__ */ jsxs(
            "svg",
            {
              className: cn("size-4", open ? "hidden" : ""),
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx("line", { x1: "3", x2: "21", y1: "6", y2: "6" }),
                /* @__PURE__ */ jsx("line", { x1: "3", x2: "21", y1: "12", y2: "12" }),
                /* @__PURE__ */ jsx("line", { x1: "3", x2: "21", y1: "18", y2: "18" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "svg",
            {
              className: cn("size-4 shrink-0", open ? "" : "hidden"),
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsx("path", { d: "M18 6 6 18" }),
                /* @__PURE__ */ jsx("path", { d: "m6 6 12 12" })
              ]
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle navigation" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      "nav",
      {
        className: cn(
          "absolute left-0 w-screen bg-white px-10 py-6 md:static md:block md:w-full md:px-8 md:py-0",
          open ? "" : "hidden"
        ),
        role: "navigation",
        "aria-label": "Main navigation",
        children: /* @__PURE__ */ jsx("div", { className: "max-h-[75vh] overflow-hidden overflow-y-auto", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-0.5 py-2 md:flex-row md:items-center md:justify-center md:gap-1 md:py-0", children: links.map(({ id, title, url }) => /* @__PURE__ */ jsx(
          "a",
          {
            href: url,
            className: "text-md flex items-center p-2 text-black hover:text-blue-500 focus:text-blue-600 focus:outline-none dark:text-blue-500 dark:focus:text-blue-500",
            "aria-current": "page",
            children: title
          },
          id
        )) }) })
      }
    )
  ] });
};
export {
  MainNavigation as default
};
