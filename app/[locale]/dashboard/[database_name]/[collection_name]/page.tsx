export default function DocumentsPage({
  params,
}: {
  params: { collection_name: string };
}) {
  return (
    <>
      <h1>Documents {params.collection_name}</h1>
    </>
  );
}
