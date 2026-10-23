import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { resolve, extname, sep } from "node:path";

const root = resolve("out");
const port = Number(process.env.PORT || 3030);
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "application/javascript; charset=utf-8", ".json": "application/json", ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8" };
if (!existsSync(root)) throw new Error("Run npm run build before starting the production preview.");
const server = createServer((request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405, { Allow: "GET, HEAD" }); response.end(); return; }
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname); } catch { response.writeHead(400); response.end(); return; }
  let file = resolve(root, `.${pathname}`);
  if (file !== root && !file.startsWith(root + sep)) { response.writeHead(403); response.end(); return; }
  if (existsSync(file) && statSync(file).isDirectory()) file = resolve(file, "index.html");
  const found = existsSync(file) && statSync(file).isFile();
  if (!found) file = resolve(root, "404.html");
  response.writeHead(found ? 200 : 404, { "Content-Type": mime[extname(file)] || "application/octet-stream", "X-Content-Type-Options": "nosniff", "Cache-Control": "no-cache" });
  if (request.method === "HEAD") response.end();
  else createReadStream(file).on("error", () => response.destroy()).pipe(response);
});
server.listen(port, "127.0.0.1", () => console.log(`Concrete Agency: http://127.0.0.1:${port}`));
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => server.close(() => process.exit(0)));
