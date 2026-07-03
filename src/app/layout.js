import { AuthProvider } from "@/context/auth";
import { CartProvider } from "@/context/cart";
import { SearchProvider } from "@/context/search";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import ToasterProvider from "@/components/Layout/ToasterProvider";
import "./globals.css";

// Ye Helmet ki jagah leta hai - default metadata jo har page pe apply hoga
// (Agar kisi specific page pe alag title/description chahiye, us page ke
// route.js/page.js me apna 'export const metadata' likh sakte ho - wo isse override kar dega)
export const metadata = {
  title: "Ecommerce app - shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  authors: [{ name: "Techinfoyt" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <SearchProvider>
              <Header />
              <main style={{ minHeight: "70vh" }}>
                <ToasterProvider />
                {children}
              </main>
              <Footer />
            </SearchProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
