import { jsxs, jsx } from "react/jsx-runtime";
const Video = ({ video }) => {
  return /* @__PURE__ */ jsxs("video", { className: "w-full", controls: true, children: [
    /* @__PURE__ */ jsx("source", { src: video.src }),
    /* @__PURE__ */ jsx("track", { kind: "captions" })
  ] });
};
export {
  Video as default
};
