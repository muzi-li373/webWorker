// src/index.js
import { cutFile } from "./cutFile";

document.getElementById("fileInput").onchange = async (e) => {
  const startTime = performance.now();
  console.log("🚀 ~ document.getElementById ~ 分片开始:");
  console.log("分片中...");
  const file = e.target.files[0];
  const chunks = await cutFile(file);
  console.log("🚀 ~ document.getElementById ~ chunks:", chunks);
  console.log("🚀 ~ document.getElementById ~ 分片结束:");
  const endTime = performance.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  console.log(
    "🚀 ~ document.getElementById ~ 分片结束, 总用时:",
    duration,
    "秒"
  );
};
