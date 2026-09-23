import HomePage from "../components/pages/home-page";

export const metadata = {
  title: "Build it better",
  description: "Daniel Rose helps founder-led companies build and ship better digital products.",
  openGraph: {
    title: "Build it better. Build it faster.",
    description: "Daniel Rose helps founder-led companies build and ship better digital products.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build it better. Build it faster.",
    description: "Daniel Rose helps founder-led companies build and ship better digital products.",
  },
};

export default function Home() {
  return <HomePage />;
}
