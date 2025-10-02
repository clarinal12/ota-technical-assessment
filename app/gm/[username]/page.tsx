import Image from "next/image";
import styles from "@/app/page.module.css";
import Profile, { ProfileProps } from "@/components/Profile/profile.component";
import Link from "next/link";
import { JSX } from "react";

export const revalidate = 60;

type ChessComGMs = {
  players: string[];
};

export async function generateStaticParams(): Promise<{ username: string }[]> {
  const data = await fetch("https://api.chess.com/pub/titled/GM");
  const gms: ChessComGMs = await data.json();
  return gms.players.map((gm: string) => ({ username: gm }));
}

type GrandMasterParams = {
  params: { username: string };
};

export default async function GrandMaster({
  params,
}: GrandMasterParams): Promise<JSX.Element> {
  const { username } = await params;
  let gm: ProfileProps | null = null;
  let error: string | null = null;

  try {
    const data = await fetch(`https://api.chess.com/pub/player/${username}`);
    gm = await data.json();
  } catch (err) {
    error = "Could not load player data.";
  }

  return (
    <main className={styles.main}>
      {error ? (
        <div>{error}</div>
      ) : (
        <div>
          <div className={styles.ctas}>
            <Link className={styles.secondary} href="/gm">
              Back to Grandmasters
            </Link>
          </div>
          <div>{gm && <Profile {...gm} />}</div>
        </div>
      )}
    </main>
  );
}
