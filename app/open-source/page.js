import OpenSourcePage from "../../components/pages/open-source-page";

const description = "Open source tools and field guides from Bloom Interactive, including responsive iframe guidance, Story Points, preview-feedback, and db-test-kit-js.";

export const metadata = {
  title: "Open source",
  description,
  openGraph: {
    title: "Open source — Tools we built and kept open.",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Open source — Tools we built and kept open.",
    description,
  },
};

export default function OpenSource() {
  return <OpenSourcePage />;
}
