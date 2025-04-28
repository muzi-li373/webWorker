import { createChunk } from './createChunk'

// 假设和后端预定好了每个分片最大5M
const CHUNK_SIZE = 5 * 1024 * 1024;

export const cutFile = async (file) => {
    // 计算出分片的数量
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE)

    const result = []
    for (let index = 0; index < chunkCount; index++) {
        const chunk = await createChunk(file, index, CHUNK_SIZE)
        result.push(chunk)
    }
    return result
}
