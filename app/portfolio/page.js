import PortfolioPage from "../../components/pages/portfolio-page";

export const metadata = {
  title: "Portfolio",
  description: "Selected product, design, and engineering work by Daniel Rose.",
  openGraph: {
    title: "Proof, not promises.",
    description: "Selected product, design, and engineering work by Daniel Rose.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proof, not promises.",
    description: "Selected product, design, and engineering work by Daniel Rose.",
  },
};

export default function Portfolio() {
  return <PortfolioPage />;
}
