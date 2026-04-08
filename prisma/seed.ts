import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Clean existing data first
  // await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  await prisma.locationFeature.deleteMany();
  await prisma.locationHour.deleteMany();
  await prisma.location.deleteMany();
  // Create Categories
  const seasonal = await prisma.category.create({
    data: { name: "Seasonal", slug: "seasonal" },
  });

  const cakes = await prisma.category.create({
    data: { name: "Cakes", slug: "cakes" },
  });

  const rolls = await prisma.category.create({
    data: { name: "Rolls", slug: "rolls" },
  });

  const pastries = await prisma.category.create({
    data: { name: "Pastries", slug: "pastries" },
  });

  // -------------------------
  // 1. Yule Log Cake
  // -------------------------
  await prisma.product.create({
    data: {
      name: "Yule Log Cake",
      slug: "yule-log-cake",
      price: 108.0,
      tagline: "A festive classic reimagined with Miyabi finesse.",
      preOrderDays: 2,
      descriptionFull:
        "Inspired by the traditional Christmas centrepiece, this Yule Log Cake is a delicate balance of light sponge and luscious filling, carefully rolled to achieve its signature swirl. The cake is soft and მოქist, enveloping a smooth, velvety cream that melts effortlessly on the palate. Finished with a rustic exterior reminiscent of a woodland log, every detail is crafted to evoke warmth, celebration, and quiet indulgence. Rich yet not overwhelming, it offers a harmonious blend of flavour and texture — a timeless dessert made for meaningful gatherings and festive moments.",
      size: '6"',
      serves: "4–8 Serves",
      alcoholIntensity: "None",
      umami: "⭐️⭐️⭐️⭐️",
      suggestedFor:
        "Christmas gatherings, gifting, festive parties, house visits, corporate celebrations, and customers seeking a refined seasonal dessert with classic holiday charm.",
      servingTip:
        "Allow the cake to rest at chilled room temperature (10–15 minutes) before serving to let the vanilla cream soften and the chocolate aroma bloom. Use a warm, clean knife to achieve smooth slices.",
      isAvailable: true,
      isFeatured: true,
      categoryId: seasonal.id,
    },
  });

  // -------------------------
  // 2. Burnt Cheese Cake
  // -------------------------
  await prisma.product.create({
    data: {
      name: "Burnt Cheese Cake",
      slug: "burnt-cheese-cake",
      price: 88.0,
      tagline: "Caramelised edges with a lusciously creamy heart.",
      preOrderDays: 1,
      descriptionFull:
        "A modern classic inspired by the famed Basque-style cheesecake, baked at high heat to achieve its signature burnt top and deeply caramelised exterior. Beneath its rustic surface lies an impossibly smooth and creamy centre — rich yet balanced, with a gentle tang from premium cream cheese. Each bite melts effortlessly on the palate, offering a contrast between the lightly bitter top and the velvety interior. Unadorned and unapologetically simple, this cake celebrates purity of flavour and flawless technique.",
      size: '6"',
      serves: "6–8 Serves",
      alcoholIntensity: "None",
      umami: "⭐️⭐️⭐️⭐️⭐️",
      suggestedFor:
        "Birthdays, casual celebrations, dinner parties, cheesecake lovers, gifting, and those who appreciate a rich yet balanced dessert without excessive sweetness.",
      servingTip:
        "Serve slightly chilled or at room temperature for the best texture. For clean slices, use a warm dry knife. Pairs beautifully with black coffee or unsweetened tea to balance its richness.",
      isAvailable: true,
      isFeatured: true,
      categoryId: cakes.id,
    },
  });

  // -------------------------
  // 3. Fruit Cake
  // -------------------------
  await prisma.product.create({
    data: {
      name: "Fruit Cake",
      slug: "fruit-cake",
      price: 72.0,
      tagline: "Bursting with vibrant fruits in every soft, tender bite.",
      preOrderDays: 1,
      descriptionFull:
        "A light and tender sponge layered with freshly prepared seasonal fruits and softly whipped cream. Each component is carefully balanced — the natural sweetness and gentle acidity of the fruits complement the airy cake, while the cream adds a smooth, delicate finish. Designed to be refreshing rather than heavy, this cake delivers brightness and elegance in every slice. Simple in composition yet refined in execution, it is a timeless favourite for all occasions.",
      size: "Whole Roll",
      serves: "6–8 Slices",
      alcoholIntensity: "None",
      umami: "⭐️⭐️⭐️⭐️⭐️",
      suggestedFor:
        "Birthdays, family gatherings, light celebrations, health-conscious dessert lovers, and those who prefer something fresh, fruity, and less rich.",
      servingTip:
        "Keep refrigerated and serve chilled for maximum freshness. Best enjoyed within the same day. Slice with a clean sharp knife and serve immediately to preserve the fruit’s natural texture.",
      isAvailable: true,
      isFeatured: false,
      categoryId: rolls.id,
    },
  });

  // -------------------------
  // 4. Matcha Ichigo
  // -------------------------
  await prisma.product.create({
    data: {
      name: "Matcha Ichigo",
      slug: "matcha-ichigo",
      price: 92.0,
      tagline:
        "Earthy matcha meets the delicate sweetness of fresh strawberries.",
      preOrderDays: 2,
      descriptionFull:
        "A harmonious blend of Japanese elegance and seasonal freshness, this cake features soft, airy matcha sponge layered with lightly sweetened cream and vibrant fresh strawberries (ichigo). The matcha brings a gentle bitterness and deep, aromatic character, perfectly balanced by the natural sweetness and subtle acidity of the strawberries. Each layer is crafted to achieve a light, clean finish — never heavy, always refined. The result is a beautifully balanced dessert that feels both refreshing and indulgent, capturing the essence of Japanese-inspired pâtisserie.",
      size: '6" Rectangle',
      serves: "4–6 Serves",
      alcoholIntensity: "None",
      umami: "⭐️⭐️⭐️",
      suggestedFor:
        "Matcha lovers, birthdays, romantic occasions, afternoon tea, Japanese dessert enthusiasts, and those who enjoy light, less-sweet cakes with elegant flavour profiles.",
      servingTip:
        "Keep refrigerated and serve chilled for optimal freshness. For best texture and flavour, allow the cake to sit at room temperature for 10–15 minutes before serving. Slice with a clean, sharp knife and wipe between cuts for neat layers.",
      isAvailable: true,
      isFeatured: true,
      categoryId: pastries.id,
    },
  });

  console.log("✅ All 4 products seeded successfully!");

  const met = await prisma.location.create({
    data: {
      type: "Bakery Café",
      name: "Douceur Patisserie @ The MET",
      shortName: "The MET",
      address:
        "LG 01-02, Menara The MET, Jalan Dutamas 2, Mont Kiara, 50480 Kuala Lumpur",
      phone: "+603-7627 1202",
      mapsUrl: "https://maps.google.com/?q=Menara+The+MET+Mont+Kiara",
      image: "/images/location-met.jpg",
      orderLabel: "Order for Takeaways",
      orderHref: "/collections",
      sortOrder: 1,
    },
  });

  await prisma.locationHour.createMany({
    data: [
      {
        locationId: met.id,
        label: "Takeaways & Dine-In",
        time: "Mon – Sun  ·  9am – 6pm",
        sortOrder: 1,
      },
      {
        locationId: met.id,
        label: "Click & Collect",
        time: "Mon – Sun  ·  11am – 6pm",
        sortOrder: 2,
      },
    ],
  });

  await prisma.locationFeature.createMany({
    data: [
      { locationId: met.id, label: "Dine-in", sortOrder: 1 },
      { locationId: met.id, label: "Takeaways", sortOrder: 2 },
      { locationId: met.id, label: "Pickups", sortOrder: 3 },
      { locationId: met.id, label: "No Delivery", sortOrder: 4 },
    ],
  });

  // ── Location 2: Plaza Conlay ──
  const conlay = await prisma.location.create({
    data: {
      type: "Dessert Café",
      name: "Douceur Patisserie @ Plaza Conlay",
      shortName: "Plaza Conlay",
      address:
        "Unit M1G1, Menara 1, Plaza Conlay, Lot 301, Jalan Conlay, 50450 Kuala Lumpur",
      phone: "+603-2181 3366",
      mapsUrl: "https://maps.google.com/?q=Plaza+Conlay+Kuala+Lumpur",
      image: "/images/location-conlay.jpg",
      orderLabel: "Order for Takeaways",
      orderHref: "/collections",
      sortOrder: 2,
    },
  });

  await prisma.locationHour.createMany({
    data: [
      {
        locationId: conlay.id,
        label: "Takeaways & Dine-In",
        time: "Mon – Sun  ·  10am – 6pm",
        sortOrder: 1,
      },
      {
        locationId: conlay.id,
        label: "Click & Collect",
        time: "Mon – Sun  ·  11.30am – 6pm",
        sortOrder: 2,
      },
    ],
  });

  await prisma.locationFeature.createMany({
    data: [
      { locationId: conlay.id, label: "Dine-in", sortOrder: 1 },
      { locationId: conlay.id, label: "Takeaways", sortOrder: 2 },
      { locationId: conlay.id, label: "Pickups", sortOrder: 3 },
      { locationId: conlay.id, label: "No Delivery", sortOrder: 4 },
    ],
  });

  // ── Location 3: HQ ──
  const hq = await prisma.location.create({
    data: {
      type: "Central Kitchen",
      name: "Douceur Patisserie HQ",
      shortName: "Patisserie HQ",
      address:
        "17, Jalan Teknologi 3/3A, Surian Industrial Park, 47810 Kota Damansara, Selangor",
      phone: "+603-6141 0888",
      mapsUrl:
        "https://maps.google.com/?q=Surian+Industrial+Park+Kota+Damansara",
      image: "/images/location-hq.jpg",
      orderLabel: "Order for Delivery / Pickup",
      orderHref: "/collections",
      sortOrder: 3,
    },
  });

  await prisma.locationHour.createMany({
    data: [
      {
        locationId: hq.id,
        label: "Click & Collect",
        time: "Mon – Sun  ·  10am – 6pm",
        sortOrder: 1,
      },
    ],
  });

  await prisma.locationFeature.createMany({
    data: [
      { locationId: hq.id, label: "No Dine-in", sortOrder: 1 },
      {
        locationId: hq.id,
        label: "Delivery Across Klang Valley",
        sortOrder: 2,
      },
    ],
  });

  console.log("✅ Locations seeded successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
