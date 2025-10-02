"use client";

import React, { useState } from "react";
import { GrandMasterListProps } from "./grandmaster-list.types";
import Link from "next/link";
import Pagination from "../Pagination/pagination.component";

const GrandMasterList: React.FC<GrandMasterListProps> = ({ players }) => {
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = players.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div>
      <ol>
        {currentItems.map((gm: string) => (
          <li key={gm}>
            <Link href={`/gm/${gm}`}>{gm}</Link>
          </li>
        ))}
      </ol>
      <Pagination
        totalItems={players.length || 0}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default GrandMasterList;
