import styles from "@/app/page.module.css";
import GrandMasterList from "@/components/GrandmasterList/grandmaster-list.component";
import Pagination from "@/components/Pagination/pagination.component";
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
        <GrandMasterList players={gms.players} />
      ) : (
        <div>No players available.</div>
      )}
    </main>
  );
}
