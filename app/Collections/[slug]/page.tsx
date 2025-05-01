import { getProduct } from "@/app/lib/collections";
import { notFound } from "next/navigation";
import ProductClient from "@/app/Collections/[slug]/ProductClient";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProduct(params.slug);
  if (!product) return notFound();

  return <ProductClient product={product} />;
}
