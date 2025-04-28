// src/index.js
import { cutFile } from "./cutFile";

document.getElementById("fileInput").onchange = async (e) => {
  console.log("🚀 ~ document.getElementById ~ 分片开始:");
  console.log("分片中...");
  const file = e.target.files[0];
  const chunks = await cutFile(file);
  console.log("🚀 ~ document.getElementById ~ chunks:", chunks);
  console.log("🚀 ~ document.getElementById ~ 分片结束:");
};
