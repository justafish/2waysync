var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import useSWR from "swr";
import { JsonApiClient } from "drupal-canvas";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { useMemo, useState, useCallback } from "react";
const client = new JsonApiClient();
const ITEMS_PER_PAGE = 10;
const ENTITY_TYPE_MAP = {
  page: "canvas_page",
  node: "node"
};
const CONTENT_TYPE_FIELDS = ["article", "person"];
const COMMON_FIELDS = ["title", "path"];
function getSearchQuery() {
  if (typeof window === "undefined") return "";
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("q") || "";
}
function addFieldsForAllTypes(params, fields) {
  params.addFields("page", fields);
  CONTENT_TYPE_FIELDS.forEach((contentType) => {
    params.addFields(`node--${contentType}`, fields);
  });
  return params;
}
function buildFilterConfig(selectedEntityTypes, selectedContentTypes) {
  if (selectedEntityTypes.length === 0 && selectedContentTypes.length === 0) {
    return null;
  }
  const conditions = [];
  if (selectedEntityTypes.includes("page")) {
    conditions.push({ entity_type: ENTITY_TYPE_MAP.page });
  }
  if (selectedContentTypes.length > 0) {
    conditions.push({
      entity_type: ENTITY_TYPE_MAP.node,
      content_type: selectedContentTypes.length === 1 ? selectedContentTypes[0] : { value: selectedContentTypes, operator: "IN" }
    });
  } else if (selectedEntityTypes.includes("node")) {
    conditions.push({ entity_type: ENTITY_TYPE_MAP.node });
  }
  if (conditions.length === 0) return null;
  if (conditions.length === 1) return conditions[0];
  return { _or: true, conditions };
}
function buildSearchQuery(searchQuery, filterConfig, pageOffset) {
  const params = new DrupalJsonApiParams().addPageLimit(ITEMS_PER_PAGE).addPageOffset(pageOffset);
  addFieldsForAllTypes(params, COMMON_FIELDS);
  if (searchQuery) {
    params.addFilter("fulltext", searchQuery);
  }
  let queryString = params.getQueryString();
  if (filterConfig) {
    const filterParams = [];
    if (filterConfig._or && filterConfig.conditions) {
      filterConfig.conditions.forEach((condition, index) => {
        Object.entries(condition).forEach(([key, value]) => {
          const groupId = `condition_${index}`;
          filterParams.push(`filter[${groupId}][condition][path]=${key}`);
          if (typeof value === "object" && value.operator) {
            filterParams.push(`filter[${groupId}][condition][operator]=${value.operator}`);
            const values = Array.isArray(value.value) ? value.value : [value.value];
            values.forEach((v, vIndex) => {
              filterParams.push(`filter[${groupId}][condition][value][${vIndex}]=${v}`);
            });
          } else {
            filterParams.push(`filter[${groupId}][condition][value]=${value}`);
          }
          filterParams.push(`filter[${groupId}][condition][memberOf]=or_group`);
        });
      });
      filterParams.push(`filter[or_group][group][conjunction]=OR`);
    } else {
      Object.entries(filterConfig).forEach(([key, value]) => {
        filterParams.push(`filter[${key}][condition][path]=${key}`);
        if (typeof value === "object" && value.operator) {
          filterParams.push(`filter[${key}][condition][operator]=${value.operator}`);
          const values = Array.isArray(value.value) ? value.value : [value.value];
          values.forEach((v, vIndex) => {
            filterParams.push(`filter[${key}][condition][value][${vIndex}]=${v}`);
          });
        } else {
          filterParams.push(`filter[${key}][condition][value]=${value}`);
        }
      });
    }
    if (filterParams.length > 0) {
      queryString += "&" + filterParams.join("&");
    }
  }
  return queryString;
}
function buildFacetQuery(searchQuery) {
  const params = new DrupalJsonApiParams();
  addFieldsForAllTypes(params, ["type"]);
  if (searchQuery) {
    params.addFilter("fulltext", searchQuery);
  }
  return params.getQueryString();
}
function calculateFacets(data) {
  if (!(data == null ? void 0 : data.length)) {
    return { entityTypes: {}, contentTypes: {} };
  }
  const entityTypeCounts = {};
  const contentTypeCounts = {};
  data.forEach((item) => {
    const [entityType, contentType] = item.type.split("--");
    entityTypeCounts[entityType] = (entityTypeCounts[entityType] || 0) + 1;
    if (entityType === "node" && contentType) {
      contentTypeCounts[contentType] = (contentTypeCounts[contentType] || 0) + 1;
    }
  });
  return { entityTypes: entityTypeCounts, contentTypes: contentTypeCounts };
}
function calculateFilteredFacets(data, selectedContentTypes) {
  if (!(data == null ? void 0 : data.length)) {
    return { entityTypes: {}, contentTypes: {} };
  }
  const entityTypeCounts = {};
  const contentTypeCounts = {};
  data.forEach((item) => {
    const [entityType, contentType] = item.type.split("--");
    if (selectedContentTypes.length > 0) {
      if (entityType === "page") {
        entityTypeCounts[entityType] = (entityTypeCounts[entityType] || 0) + 1;
      } else if (entityType === "node" && contentType && selectedContentTypes.includes(contentType)) {
        entityTypeCounts[entityType] = (entityTypeCounts[entityType] || 0) + 1;
        contentTypeCounts[contentType] = (contentTypeCounts[contentType] || 0) + 1;
      }
    } else {
      entityTypeCounts[entityType] = (entityTypeCounts[entityType] || 0) + 1;
      if (entityType === "node" && contentType) {
        contentTypeCounts[contentType] = (contentTypeCounts[contentType] || 0) + 1;
      }
    }
  });
  return { entityTypes: entityTypeCounts, contentTypes: contentTypeCounts };
}
function extractOffsetFromLink(link) {
  if (!(link == null ? void 0 : link.href)) return null;
  try {
    const url = new URL(link.href);
    const offset = url.searchParams.get("page[offset]");
    return offset ? Math.max(0, parseInt(offset, 10)) : null;
  } catch (e) {
    return null;
  }
}
function SearchWithFacets() {
  const searchQuery = useMemo(() => getSearchQuery(), []);
  const [selectedEntityTypes, setSelectedEntityTypes] = useState([]);
  const [selectedContentTypes, setSelectedContentTypes] = useState([]);
  const [pageOffset, setPageOffset] = useState(0);
  const filterConfig = useMemo(
    () => buildFilterConfig(selectedEntityTypes, selectedContentTypes),
    [selectedEntityTypes, selectedContentTypes]
  );
  const facetQueryString = useMemo(
    () => buildFacetQuery(searchQuery),
    [searchQuery]
  );
  const searchQueryString = useMemo(
    () => buildSearchQuery(searchQuery, filterConfig, pageOffset),
    [searchQuery, filterConfig, pageOffset]
  );
  const { data: facetData } = useSWR(
    ["index--cms_content", facetQueryString],
    ([type, query]) => client.getCollection(type, { queryString: query }),
    {
      revalidateOnFocus: false,
      dedupingInterval: 6e4
    }
  );
  const { data: searchData, links: searchLinks, error, isLoading } = useSWR(
    ["index--cms_content", searchQueryString],
    (_0) => __async(null, [_0], function* ([type, query]) {
      const response = yield fetch(`/api/index/cms_content?${searchQueryString}`);
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const searchResponse = yield response.json();
      return {
        data: searchResponse.data,
        links: searchResponse.links
      };
    }),
    { revalidateOnFocus: false }
  );
  const baseFacets = useMemo(() => calculateFacets(facetData), [facetData]);
  const facets = useMemo(
    () => calculateFilteredFacets(facetData, selectedContentTypes),
    [facetData, selectedContentTypes]
  );
  const items = (searchData == null ? void 0 : searchData.data) || [];
  const links = (searchData == null ? void 0 : searchData.links) || {};
  const toggleEntityType = useCallback((type) => {
    setSelectedEntityTypes(
      (prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    if (type === "page") {
      setSelectedContentTypes([]);
    }
    setPageOffset(0);
  }, []);
  const toggleContentType = useCallback((type) => {
    setSelectedContentTypes(
      (prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setPageOffset(0);
  }, []);
  const clearFilters = useCallback(() => {
    setSelectedEntityTypes([]);
    setSelectedContentTypes([]);
    setPageOffset(0);
  }, []);
  const handlePageChange = useCallback((link) => {
    const offset = extractOffsetFromLink(link);
    if (offset !== null) {
      setPageOffset(offset);
    }
  }, []);
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-red-600", children: "An error occurred while loading search results." }) });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#2563EB]" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-[#6B7280]", children: "Loading results..." })
    ] });
  }
  const hasFilters = selectedEntityTypes.length > 0 || selectedContentTypes.length > 0;
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-6", children: [
    Object.keys(facets.entityTypes).length > 0 && /* @__PURE__ */ jsx("aside", { className: "w-64 flex-shrink-0 search-facets", children: /* @__PURE__ */ jsxs("div", { className: "bg-white border border-[#E5E7EB] rounded-lg p-6 sticky top-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm text-[#111827]", children: "Filters" }),
        hasFilters && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: clearFilters,
            className: "text-sm text-[#2563EB] hover:underline",
            children: "Clear all"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm text-[#374151] mb-4", children: "Entity Type" }),
        Object.entries(facets.entityTypes).map(([type, count]) => /* @__PURE__ */ jsxs(
          "label",
          {
            className: "flex items-center gap-2 cursor-pointer hover:bg-[#F9FAFB] p-1 rounded mb-2",
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: selectedEntityTypes.includes(type),
                  onChange: () => toggleEntityType(type),
                  className: "w-4 h-4 text-[#2563EB] rounded"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-[#374151] flex-1", children: type === "node" ? "Content" : type === "page" ? "Canvas Page" : type }),
              /* @__PURE__ */ jsxs("span", { className: "text-xs text-[#9CA3AF] font-medium", children: [
                "(",
                count,
                ")"
              ] })
            ]
          },
          type
        ))
      ] }),
      Object.keys(baseFacets.contentTypes).length > 0 && !selectedEntityTypes.includes("page") && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm text-[#374151] mb-4", children: "Content Type" }),
        Object.entries(baseFacets.contentTypes).map(([type, count]) => /* @__PURE__ */ jsxs(
          "label",
          {
            className: "flex items-center gap-2 cursor-pointer hover:bg-[#F9FAFB] p-1 rounded mb-2",
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: selectedContentTypes.includes(type),
                  onChange: () => toggleContentType(type),
                  className: "w-4 h-4 text-[#2563EB] rounded"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-[#374151] flex-1 capitalize", children: type }),
              /* @__PURE__ */ jsxs("span", { className: "text-xs text-[#9CA3AF] font-medium", children: [
                "(",
                count,
                ")"
              ] })
            ]
          },
          type
        ))
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "flex-1 min-w-0 search-results", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-bold text-2xl mb-4", children: "Search Results" }),
      items.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[#6B7280] mb-2", children: "No results found." }),
        hasFilters && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: clearFilters,
            className: "text-sm text-[#2563EB] hover:underline",
            children: "Clear all filters"
          }
        )
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: items.map((item, index) => {
          var _a, _b, _c;
          return /* @__PURE__ */ jsx("li", { className: "border-b border-[#E5E7EB] py-3", children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-[#2563EB] hover:underline", children: /* @__PURE__ */ jsx("a", { href: ((_b = (_a = item.attributes) == null ? void 0 : _a.path) == null ? void 0 : _b.alias) || "#", children: (_c = item.attributes) == null ? void 0 : _c.title }) }) }, item.id || index);
        }) }),
        links && /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-6 search-pagination", children: [
          links.first && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handlePageChange(links.first),
              className: "px-4 py-2 border rounded-lg bg-white border-[#E5E7EB] text-[#6B7280] text-sm flex items-center hover:bg-[#F9FAFB]",
              children: "First"
            }
          ),
          links.prev && /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handlePageChange(links.prev),
              className: "px-4 py-2 border rounded-lg bg-white border-[#E5E7EB] text-[#6B7280] text-sm flex items-center hover:bg-[#F9FAFB]",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "mr-1", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ jsx("path", { d: "M10 12L6 8L10 4", stroke: "#4B5563", strokeLinecap: "round", strokeLinejoin: "round" }) }),
                "Previous"
              ]
            }
          ),
          links.next && /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handlePageChange(links.next),
              className: "px-4 py-2 border rounded-lg bg-white border-[#E5E7EB] text-[#6B7280] text-sm flex items-center hover:bg-[#F9FAFB]",
              children: [
                "Next",
                /* @__PURE__ */ jsx("svg", { className: "ml-1", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ jsx("path", { d: "M6 12L10 8L6 4", stroke: "#4B5563", strokeLinecap: "round", strokeLinejoin: "round" }) })
              ]
            }
          ),
          links.last && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handlePageChange(links.last),
              className: "px-4 py-2 border rounded-lg bg-white border-[#E5E7EB] text-[#6B7280] text-sm flex items-center hover:bg-[#F9FAFB]",
              children: "Last"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  SearchWithFacets as default
};
