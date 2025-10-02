import Image from "next/image";
import styles from "@/app/page.module.css";
import Profile from "@/components/Profile/profile.component";
import Link from "next/link";
import { JSX } from "react";
import { ProfileProps } from "@/components/Profile/profile.types";
import { Metadata } from "next";

export const revalidate = 60;

type ChessComGMs = {
  players: string[];
};

type GrandMasterParams = {
  params: { username: string };
};

export async function generateMetadata({
  params,
}: GrandMasterParams): Promise<Metadata> {
  const { username } = await params;
  let gm: ProfileProps | null = null;

  try {
    const data = await fetch(`https://api.chess.com/pub/player/${username}`);
    gm = await data.json();
  } catch (err) {
    console.error("Error fetching GM data:", err);
  }

  const name = gm?.name || gm?.username || "Unknown Player";

  return {
    title: `${name} - Profile`,
    description: `Profile page for ${name}`,
  };
}

export async function generateStaticParams(): Promise<{ username: string }[]> {
  const data = await fetch("https://api.chess.com/pub/titled/GM");
  const gms: ChessComGMs = await data.json();
  return gms.players.map((gm: string) => ({ username: gm }));
}

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
      <div className={styles.ctas}>
        <Link className={styles.secondary} href="/gm">
          Back to Grandmasters
        </Link>
      </div>
      {error ? (
        <div>{error}</div>
      ) : (
        <div>{<Profile username={username} profileData={gm} />}</div>
      )}
    </main>
  );
}
