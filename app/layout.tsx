// app/layout.tsx — DROP-IN REPLACEMENT
import "./globals.css";

export const metadata = {
  title: "Isaac Seiler",
  description: "Isaac's site: more coming soon",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
