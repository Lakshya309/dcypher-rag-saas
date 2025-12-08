import "./globals.css";
import AnimatedNavbar from "@/components/shared/AnimatedNavbar";
import Footer from "@/components/shared/Footer";
import RouteTransition from "@/components/shared/RouteTransition";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AnimatedNavbar />

        <RouteTransition>
          <main className="min-h-screen">
            {children}
          </main>
        </RouteTransition>

        <Footer />
      </body>
    </html>
  );
}
