import styles from "./page.module.css";
import Link from "next/link";

export const revalidate = 60;

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.ctas}>
        <Link className={styles.primary} href="/gm">
          View Grandmasters
        </Link>
      </div>
    </main>
  );
}
