import { notFound } from "next/navigation";
import ProdutoPageClient from "./produto-page-client";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProdutoPage({ params }: PageProps) {
  const id = parseInt(await (await params).id);

  if (isNaN(id)) {
    notFound();
  }

  return (
    <ProdutoPageClient
      params={{
        id,
      }}
    />
  );
}
