const fs = require("node:fs/promises");
const path = require("node:path");
const { createHash } = require("node:crypto");
const sharp = require("sharp");

const images = {
    "/RicePurityTest.webp": [40, 80, 120],
    "/rice-purity-test.webp": [384, 640, 768, 1080, 1440, 1974],
};

(async () => {
    const output = path.join(__dirname, "../public/optimized");
    await fs.mkdir(output, { recursive: true });
    const manifest = {};
    for (const [src, widths] of Object.entries(images)) {
        const input = await fs.readFile(path.join(__dirname, "../public", src));
        const metadata = await sharp(input).metadata();
        const variants = [];
        for (const width of widths) {
            const image = await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toBuffer();
            const hash = createHash("sha256").update(image).digest("hex").slice(0, 12);
            const filename = path.basename(src, ".webp") + "-" + width + "-" + hash + ".webp";
            await fs.writeFile(path.join(output, filename), image);
            variants.push({ width, src: "/optimized/" + filename });
        }
        manifest[src] = { width: metadata.width, height: metadata.height, variants };
    }
    await fs.writeFile(path.join(__dirname, "../src/data/optimized-images.json"), JSON.stringify(manifest, null, 2) + "\n");
    console.log("Generated responsive WebP images for " + Object.keys(images).length + " assets.");
})().catch(error => { console.error(error); process.exitCode = 1; });
