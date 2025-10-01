import Image from "next/image";
import styles from "../../page.module.css";

export async function generateStaticParams() {
  const data = await fetch("https://api.chess.com/pub/titled/GM");
  const gms = await data.json();

  return gms.players.map((gm: string) => ({
    username: gm,
  }));
}

export default async function GrandMaster({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;
  let gm = null;
  let error = null;

  try {
    const data = await fetch(`https://api.chess.com/pub/player/${username}`);
    gm = await data.json();

    console.log({ data, gm });
  } catch (err) {
    error = "Could not load player data.";
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {error ? (
          <div>{error}</div>
        ) : (
          gm?.name || gm?.username || "No player data found."
        )}
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
