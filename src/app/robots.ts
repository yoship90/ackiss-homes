import { MetadataRoute } from "next";

// TODO: when custom domain is live and ready for indexing, change to:
//   rules: { userAgent: "*", allow: "/" }
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
