import StoreProvider from "@/lib/StoreProvider";
import { Toaster } from "sonner";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
          <Toaster position="top-right" richColors closeButton expand={false} />
        </StoreProvider>
      </body>
    </html>
  );
}
