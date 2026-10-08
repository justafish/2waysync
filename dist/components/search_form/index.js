import { jsxs, jsx } from "react/jsx-runtime";
import { cn } from "drupal-canvas";
const searchParams = new URLSearchParams(window.location.search);
const q = searchParams.get("q") || "";
function SearchForm({ className }) {
  return /* @__PURE__ */ jsxs(
    "form",
    {
      action: "/search",
      method: "get",
      className: cn("flex gap-2 leading-5", className),
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex w-full items-center", children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "search",
            name: "q",
            id: "search_input",
            defaultValue: q,
            placeholder: "Search...",
            className: "flex-grow rounded-md border-1 border-gray-200 bg-white px-3 py-2"
          }
        ) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            "aria-label": "Search",
            className: "rounded bg-blue-600 p-2.5 leading-0 text-white",
            children: /* @__PURE__ */ jsxs(
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
            )
          }
        )
      ]
    }
  );
}
export {
  SearchForm as default
};
