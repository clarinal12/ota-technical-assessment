import styles from "@/app/page.module.css";
import Link from "next/link";
import { JSX } from "react";

type ChessComGMs = {
  players: string[];
};

export default async function GrandMasters(): Promise<JSX.Element> {
  let gms: ChessComGMs | null = null;
  let error: string | null = null;

  try {
    const data = await fetch("https://api.chess.com/pub/titled/GM");
    gms = await data.json();
  } catch (err) {
    error = "Could not load players";
  }

  return (
    <main className={styles.main}>
      <h2>Grandmasters:</h2>
      {error ? (
        <div>{error}</div>
      ) : gms?.players?.length ? (
        <ol>
          {gms.players.map((gm: string) => (
            <li key={gm}>
              <Link href={`/gm/${gm}`}>{gm}</Link>
            </li>
          ))}
        </ol>
      ) : (
        <div>No players available.</div>
      )}
    </main>
  );
}
