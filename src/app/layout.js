import StoreProvider from "@/lib/StoreProvider";
import { Toaster } from "sonner";
import "./globals.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getNavLinks() {
  try {
    const res = await fetch(`${API_URL}/subcategories/nav-links`, {
      next: { revalidate: 259200 },
    });
    const data = await res.json();
    return data?.navLinks || data?.data?.navLinks || [];
  } catch {
    return [];
  }
}

async function getHomeSections() {
  try {
    const res = await fetch(`${API_URL}/pages`, {
      next: { revalidate: 259200 },
    });
    const data = await res.json();
    const pages = data?.pages || [];
    const homePage = pages.find((p) => p.slug === "/home");
    if (!homePage?.sections) return [];
    return [...homePage.sections].sort(
      (a, b) => (a.order ?? 9999) - (b.order ?? 9999),
    );
  } catch {
    return [];
  }
}

export default async function RootLayout({ children }) {
  const [navLinks, homeSections] = await Promise.all([
    getNavLinks(),
    getHomeSections(),
  ]);

  return (
    <html lang="en">
      <body>
        <StoreProvider navLinks={navLinks} homeSections={homeSections}>
          {children}
          <Toaster position="top-right" richColors closeButton expand={false} />
        </StoreProvider>
      </body>
    </html>
  );
}
