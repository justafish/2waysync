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
import { jsx, Fragment } from "react/jsx-runtime";
import Card from "@/components/card";
import CardContainer from "@/components/card_container";
import { JsonApiClient, getNodePath, getPageData } from "drupal-canvas";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import useSWR from "swr";
const client = new JsonApiClient();
const RelatedArticles = ({
  mainEntity,
  heading,
  headingPosition,
  headingElement,
  headingSize,
  layout,
  textColor
}) => {
  const { data } = useSWR(
    [
      "node--article",
      {
        queryString: new DrupalJsonApiParams().addInclude(["field_image", "uid"]).addFilter("id", mainEntity.uuid, "<>").addSort("created", "DESC").addPageLimit(4).getQueryString()
      }
    ],
    ([type, options]) => client.getCollection(type, options)
  );
  const formatDayMonthYear = (iso) => {
    var _a, _b, _c, _d, _e, _f;
    const d = new Date(iso);
    const parts = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).formatToParts(d);
    const day = (_b = (_a = parts.find((p) => p.type === "day")) == null ? void 0 : _a.value) != null ? _b : "";
    const month = (_d = (_c = parts.find((p) => p.type === "month")) == null ? void 0 : _c.value) != null ? _d : "";
    const year = (_f = (_e = parts.find((p) => p.type === "year")) == null ? void 0 : _e.value) != null ? _f : "";
    return `${day} ${month.toUpperCase()}, ${year}`;
  };
  return /* @__PURE__ */ jsx(
    CardContainer,
    {
      layout,
      heading,
      headingPosition,
      headingElement,
      headingSize,
      textColor,
      className: "gap-8",
      content: /* @__PURE__ */ jsx(Fragment, { children: data && data.map((article, i) => {
        const { title, uid, created, field_image } = article;
        const cardProps = {
          heading: title,
          byline: `${uid.display_name} - ${formatDayMonthYear(created)}`,
          image: {
            src: field_image.uri.url,
            alt: field_image.resourceIdObjMeta.alt || "Article image",
            width: field_image.resourceIdObjMeta.width,
            height: field_image.resourceIdObjMeta.height
          },
          link: getNodePath(article)
        };
        return /* @__PURE__ */ jsx(Card, __spreadValues({}, cardProps), i);
      }) })
    }
  );
};
const RelatedArticlesContainer = ({
  heading = "More articles",
  headingPosition,
  headingElement,
  headingSize,
  layout,
  textColor
}) => {
  const { mainEntity } = getPageData();
  if (!mainEntity) {
    return null;
  }
  const props = {
    heading,
    headingPosition,
    headingElement,
    headingSize,
    layout,
    textColor
  };
  return /* @__PURE__ */ jsx(RelatedArticles, __spreadProps(__spreadValues({}, props), { mainEntity }));
};
export {
  RelatedArticles,
  RelatedArticlesContainer as default
};
