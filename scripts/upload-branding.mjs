import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function uploadImage(filename) {
  const filePath = path.join(process.cwd(), "scripts/assets", filename);
  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, { filename });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function main() {
  const logo = await uploadImage("kd-plus-logo.png");
  const favicon = await uploadImage("kd-plus-favicon.png");

  await client
    .patch("siteSettings")
    .setIfMissing({ _type: "siteSettings" })
    .set({ logo, favicon })
    .commit({ autoGenerateArrayKeys: true });

  console.log("Listo: logo y favicon subidos y conectados en siteSettings.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
