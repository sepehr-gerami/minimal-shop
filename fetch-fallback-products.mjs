import { writeFileSync, mkdirSync } from "fs";

const res = await fetch("https://fakestoreapi.com/products");
const data = await res.json();

mkdirSync("./data", { recursive: true });
writeFileSync("./data/fallback-products.json", JSON.stringify(data, null, 2));

console.log(` محصول ذخیره شد توی data/fallback-products.json`);
