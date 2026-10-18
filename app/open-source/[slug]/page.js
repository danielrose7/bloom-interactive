import { notFound } from "next/navigation";
import OpenSourceCaseStudy from "../../../components/pages/open-source-case-study";
import { projects, getProject } from "../../../lib/open-source";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = project.status === "Guide" ? project.name : `${project.name} case study`;
  const description = `${project.tagline}. ${project.description}`;
  return {
    title,
    description,
    openGraph: { title, description, ...(project.image ? { images: [project.image] } : {}) },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function OpenSourceProject({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  return <OpenSourceCaseStudy project={project} next={next === project ? null : next} />;
}
