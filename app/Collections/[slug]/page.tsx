import { getProduct } from "@/app/lib/collections";
import { notFound } from "next/navigation";
import ProductClient from "@/app/Collections/[slug]/ProductClient";

interface Props {
  params: { slug: string };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.slug);
  if (!product) return notFound();

  return <ProductClient product={product} />;
}
// if we werer using an real api then we will check if we got a 404 error or not 
// and then we will check if we got a empty data or null data or not