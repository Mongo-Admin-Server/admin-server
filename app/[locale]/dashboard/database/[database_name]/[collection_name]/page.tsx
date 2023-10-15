"use client";

import { useState } from "react";

import DocumentView from "@components/view/document/DocumentView";
import IndexesView from "@components/view/indexes/IndexesView";

export default function DocumentsPage({
  params,
}: {
  params: { collection_name: string, database_name: string, filename: string, extension: string};
}) {
  const [currentPage, setCurrentPage] = useState('documents');
  
  const listPage = ['documents', 'indexes']

  const changePage = (page: string) => {
    setCurrentPage(page);
  }

  return (
    <>
      {currentPage === 'documents' && (
        <DocumentView
          params={params}
          currentPageTitle={currentPage}
          listPage={listPage}
          changePage={changePage}
        />
      )}
      {currentPage === 'indexes' && (
        <IndexesView
          params={params}
          currentPage={currentPage}
          listPage={listPage}
          changePage={changePage}
        />
      )}
    </>
  );
}
