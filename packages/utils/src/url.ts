export function getBaseUrl() {
  const base = (() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (typeof window !== "undefined") return "";
    if (process.env.VITE_PUBLIC_URL) return process.env.VITE_PUBLIC_URL;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return `http://localhost:${process.env.PORT ?? 3000}`;
  })();
  return base;
}
