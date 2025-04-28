// src/worker.js

import { createChunk } from "./createChunk";

onmessage = async (e) => {
  const { file, start, end, CHUNK_SIZE } = e.data;
  const chunkPromises = [];

  for (let index = start; index < end; index++) {
    chunkPromises.push(createChunk(file, index, CHUNK_SIZE));
  }

  const chunks = await Promise.all(chunkPromises);
  postMessage(chunks);
};
