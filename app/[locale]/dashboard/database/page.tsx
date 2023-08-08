'use client';
import Table from "@/app/[locale]/components/ui/table/Table";
import React, { useEffect, useState } from "react";

export default function ListBDD() {
  
  const [result, setResult] = useState({data: [{}] });

  useEffect(() => {
    fetch('/api/database')
      .then((response) => response.json())
      .then((data) => setResult(data))
      .catch((error) => console.error('Erreur lors de la récupération des statistiques', error));
  }, []);

  return (
    <div>
      <h1>Database</h1>
      <div className="scrollable max_height">

      {!result.data ? (
        <p>Loading...</p>
        ) : (
          <Table
            data_header={Object.keys(result.data[0])}
            data_body={result.data}
          />
          )
        }
      </div>
    </div>
  );
}