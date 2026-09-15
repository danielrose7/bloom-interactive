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
    title: "Bloom Interactive",
    description: "Strategy, design, and engineering for founder-led companies.",
    images: ["/images/bloom-logo.png"],
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
