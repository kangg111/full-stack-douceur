// lib/product-image.ts

// Converts product name to image filename
// "Cheese Cake" → "CheeseCake"
// "Yule Log Cake" → "YuleLogCake"
export function getProductImagePaths(productName: string): string[] {
  const filename = productName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  return [
    `/images/${filename}.jpg`,
    `/images/${filename}.png`,
    `/images/${filename}.webp`,
  ];
}

// Fallback if image doesn't exist
export function getProductImageWithFallback(productName: string): string[] {
  return getProductImagePaths(productName);
}
