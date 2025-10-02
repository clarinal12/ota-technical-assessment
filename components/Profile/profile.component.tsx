"use client";

import React, { useEffect, useRef } from "react";
import styles from "./profile.module.css";
import pageStyles from "@/app/page.module.css";
import Image from "next/image";
import { countryCodeToEmoji } from "@/utils/countries";
import { formatTime, formatUnixDate } from "@/utils/format";

interface LastActiveProps {
  timestamp: number;
}

export function LastActive({ timestamp }: LastActiveProps) {
  const displayRef = useRef<HTMLSpanElement>(null); // ref to hold the DOM element

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.floor(now / 1000 - timestamp);
      if (displayRef.current) {
        displayRef.current.textContent = formatTime(diff >= 0 ? diff : 0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return (
    <span suppressHydrationWarning ref={displayRef}>
      {formatTime(Math.floor(Date.now() / 1000 - timestamp))}
    </span>
  );
}

export interface ProfileProps {
  avatar?: string;
  name: string;
  username: string;
  country?: string;
  followers: number;
  url: string;
  last_online: number;
  joined: number;
  title: string;
  league: string;
  location: string;
  is_streamer: boolean;
  verified: boolean;
  status: string;
}

export default function Profile(props: ProfileProps) {
  const countryCode = (props.country || "").split("/").pop();
  return (
    <div className={styles.profile}>
      <div className={styles.heading}>
        <Image
          className={styles.avatar}
          src={props?.avatar || "/profile.svg"}
          alt={`${props?.name ?? props.username} logo`}
          width={160}
          height={160}
          priority
        />
        <div className={styles.headingRight}>
          <span>{props.username}</span>
          <h2>
            {countryCodeToEmoji(countryCode)} {props.name || 'Anonymous'}
          </h2>
          <span>{props.followers.toLocaleString()} Followers</span>
          <div className={styles.profileLink}>
            <div className={pageStyles.ctas}>
              <a
                className={pageStyles.primary}
                href={props.url}
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
            <dt className={styles.dataListItemLabel}>Last Active</dt>
            <dd className={styles.dataListItemValue}>
              <LastActive timestamp={props.last_online} />
            </dd>
          </div>
          <div className={styles.dataListItem}>
            <dt className={styles.dataListItemLabel}>Joined</dt>
            <dd className={styles.dataListItemValue}>
              {formatUnixDate(props.joined)}
            </dd>
          </div>
          <div className={styles.dataListItem}>
            <dt className={styles.dataListItemLabel}>Title</dt>
            <dd className={styles.dataListItemValue}>{props.title}</dd>
          </div>
          <div className={styles.dataListItem}>
            <dt className={styles.dataListItemLabel}>League</dt>
            <dd className={styles.dataListItemValue}>{props.league}</dd>
          </div>
          <div className={styles.dataListItem}>
            <dt className={styles.dataListItemLabel}>Location</dt>
            <dd className={styles.dataListItemValue}>{props.location}</dd>
          </div>
          <div className={styles.dataListItem}>
            <dt className={styles.dataListItemLabel}>Streamer</dt>
            <dd className={styles.dataListItemValue}>
              {props.is_streamer ? "Yes" : "No"}
            </dd>
          </div>
          <div className={styles.dataListItem}>
            <dt className={styles.dataListItemLabel}>Verified</dt>
            <dd className={styles.dataListItemValue}>
              {props.verified ? "Yes" : "No"}
            </dd>
          </div>
          <div className={styles.dataListItem}>
            <dt className={styles.dataListItemLabel}>Status</dt>
            <dd className={styles.dataListItemValue}>
              {props.status.toUpperCase()}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
