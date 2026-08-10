import handler from "vinext/server/app-router-entry";

// The application uses unoptimized images, so no Cloudflare Images binding is
// required. Static assets are served by the Sites asset layer before requests
// reach this Worker.
export default handler;
