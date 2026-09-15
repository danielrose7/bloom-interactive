import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/layout";
import { getSortedPostsData } from "../../lib/posts";

import utilStyles from "../../styles/utils.module.css";
import playgroundStyles from "../../styles/playground.module.css";

export const metadata = { title: "Playground | Bloom Interactive" };

const FIXED_IMAGE_WIDTH = 340;

export default function Playground() {
  const allPostsData = getSortedPostsData();

  return (
    <Layout>
      <section
        className={`${utilStyles.headingMd} ${utilStyles.centerPadding}`}
      >
        <div className={utilStyles.capWidth}>
          <h2 className={utilStyles.headingLg}>Playground</h2>
          <p>
            Here you'll find some things I've made over the years along with a
            quick link to the code.
          </p>
          <p>
            For better or worse most of my daily work is private / isn't as fun
            to look at.
          </p>
        </div>
        <ul className={playgroundStyles.gallery}>
          {allPostsData.map(
            ({ id, title, image, imageWidth, imageHeight }, postIndex) => {
              const correctionRatio = FIXED_IMAGE_WIDTH / imageWidth;
              const isPriority = postIndex < 6;

              return (
                <li className={utilStyles.listItem} key={id}>
                  <Link href={`/posts/${id}`} className={playgroundStyles.cardLink} transitionTypes={["bloom-navigation"]}>
                    <Image
                      src={image}
                      alt={`Preview of ${title}`}
                      width={FIXED_IMAGE_WIDTH}
                      height={Math.floor(correctionRatio * imageHeight)}
                      style={{ objectFit: "cover" }}
                      priority={isPriority}
                    />
                    <span className={playgroundStyles.cardLink__title}>
                      {title}
                    </span>
                  </Link>
                </li>
              );
            }
          )}
        </ul>
      </section>
    </Layout>
  );
}
