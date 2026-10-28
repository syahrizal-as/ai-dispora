import { readFileSync } from "node:fs";
import { join } from "node:path";
import Script from "next/script";

export const dynamic = "force-static";

// Only the repository's trusted, local lesson markup is read here, at build time.
// Interactive dialogs remain inside this opaque subtree so React does not own
// the DOM nodes changed by the educational script after hydration.
const document = readFileSync(join(process.cwd(), "content/landing.html"), "utf8");
const body = document.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1];
if (!body) throw new Error("Konten landing page tidak memiliki elemen body.");

export default function HomePage() {
  return (
    <>
      <div id="readiness-page" style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: body! }} />
      <Script id="readiness-interactions" src="/app.js" strategy="afterInteractive" />
    </>
  );
}
