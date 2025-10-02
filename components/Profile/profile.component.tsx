"use client";

import React, { use, useEffect, useState } from "react";
import styles from "./profile.module.css";
import pageStyles from "@/app/page.module.css";
import Image from "next/image";
import { countryCodeToEmoji } from "@/utils/countries";
import { formatUnixDate } from "@/utils/format";
import { ProfileComponentProps } from "./profile.types";
import LastActive from "../LastActive/last-active.component";

const defaultProfile = {
  avatar: "",
  name: "",
  username: "",
  country: "",
  followers: "",
  url: "",
  last_online: 0,
  joined: 0,
  title: "",
  league: "",
  location: "",
  is_streamer: false,
  verified: false,
  status: "",
};

const featchProfile = async (username: string) => {
  const response = await fetch(`https://api.chess.com/pub/player/${username}`);
  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }

  const responseJson = await response.json();
  return responseJson;
};

export default function Profile(props: ProfileComponentProps) {
  const { profileData, username } = props;

  const [profileState, setProfileState] = useState(defaultProfile);

  useEffect(() => {
    if (!profileData) {
      featchProfile(username).then((data) => {
        setProfileState(data);
      });
    }
  }, [profileData, username]);

  const profile = profileData || profileState;
  const countryCode = (profile.country || "").split("/").pop();

  return (
    <div className={styles.profile}>
      <div className={styles.heading}>
        <Image
          className={styles.avatar}
          src={profile?.avatar || "/profile.svg"}
          alt={`${profile?.name ?? username} logo`}
          width={160}
          height={160}
          priority
        />
        <div className={styles.headingRight}>
          <span>{username}</span>
          <h2>
            {countryCodeToEmoji(countryCode)} {profile.name || "Anonymous"}
          </h2>
          <span>{profile.followers.toLocaleString()} Followers</span>
          <div className={styles.profileLink}>
            <div className={pageStyles.ctas}>
              <a
                className={pageStyles.primary}
                href={profile.url}
                target="_blank"
                rel="noreferrer"
              >
                View Full Profile
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.details}>
        <dl className={styles.dataList}>
          <div className={styles.dataListItem}>
            <dt>Last Active</dt>
            <dd>
              <LastActive timestamp={profile.last_online} />
            </dd>
          </div>
          <div className={styles.dataListItem}>
            <dt>Joined</dt>
            <dd>{formatUnixDate(profile.joined)}</dd>
          </div>
          <div className={styles.dataListItem}>
            <dt>Title</dt>
            <dd>{profile.title}</dd>
          </div>
          <div className={styles.dataListItem}>
            <dt>League</dt>
            <dd>{profile.league}</dd>
          </div>
          <div className={styles.dataListItem}>
            <dt>Location</dt>
            <dd>{profile.location}</dd>
          </div>
          <div className={styles.dataListItem}>
            <dt>Streamer</dt>
            <dd>{profile.is_streamer ? "Yes" : "No"}</dd>
          </div>
          <div className={styles.dataListItem}>
            <dt>Verified</dt>
            <dd>{profile.verified ? "Yes" : "No"}</dd>
          </div>
          <div className={styles.dataListItem}>
            <dt>Status</dt>
            <dd>{profile.status.toUpperCase()}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
