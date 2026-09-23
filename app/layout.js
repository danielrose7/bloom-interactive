import "../styles/global.css";
import ViewTransitions from "../components/view-transitions";

export const metadata = {
  metadataBase: new URL("https://gobloom.io"),
  title: {
    default: "Bloom Interactive",
    template: "%s | Bloom Interactive",
  },
  description: "Strategy, design, and engineering for founder-led companies.",
  icons: { icon: "/images/bloom-logo.png" },
  openGraph: {
    type: "website",
    siteName: "Bloom Interactive",
    title: "Bloom Interactive",
    description: "Strategy, design, and engineering for founder-led companies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bloom Interactive",
    description: "Strategy, design, and engineering for founder-led companies.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ViewTransitions>{children}</ViewTransitions>
      </body>
    </html>
  );
}
