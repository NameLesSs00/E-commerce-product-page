export const collections = [  {
    slug: "sneakers",
    company:"SNEAKER COMPANY",
    title: "Fall Limited Edition Sneakers",
    description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
    price:250.00,
    discount: 50,
    images: [
      "/image-product-1.jpg",
      "/image-product-2.jpg",
      "/image-product-3.jpg",
      "/image-product-4.jpg",
    ],
    thumbnails: [
      "/image-product-1-thumbnail.jpg",
      "/image-product-2-thumbnail.jpg",
      "/image-product-3-thumbnail.jpg",
      "/image-product-4-thumbnail.jpg",
    ],
  }
];

// Simulate async fetch
export async function getProduct(slug: string) {
  await new Promise((res) => setTimeout(res, 300)); // simulate delay
  return collections.find(p => p.slug === slug) || null;
}
