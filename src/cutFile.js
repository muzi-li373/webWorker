// 计算出最大能开几个线程，标准就是有多少个cup有多少内核就开多少个
const MAX_THREADS = navigator.hardwareConcurrency || 4;
// 假设和后端预定好了分片大小为5M
const CHUNK_SIZE = 5 * 1024 * 1024;

/**
 * 将文件分片的主函数
 * @param {File} file - 用户选择的文件对象
 * @returns {Promise<Array>} - 返回分片数组
 */
export const cutFile = async (file) => {
  return new Promise((resolve) => {
    // 计算总分片数
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    // 实际使用的线程数量不应该超过分片数
    const actualThreadCount = Math.min(MAX_THREADS, totalChunks);
    // 存储每个线程的处理结果
    const result = [];
    // 用来计数已完成的线程
    let finishCount = 0;
    // 计算每个线程处理的分片数
    const baseChunksPerWorker = Math.floor(totalChunks / actualThreadCount);
    // 余数，如果总分片数不能被线程数量整除，那么余数就是多余的分片数
    const extraChunks = totalChunks % actualThreadCount;

    for (let i = 0; i < actualThreadCount; i++) {
      // 开启一个线程任务
      const start = i * baseChunksPerWorker + Math.min(i, extraChunks);
      const end = start + baseChunksPerWorker + (i < extraChunks ? 1 : 0);
      const worker = new Worker(new URL("./worker.js", import.meta.url));

      // 发送消息
      worker.postMessage({
        file,
        start,
        end,
        CHUNK_SIZE,
      });

      worker.onmessage = (e) => {
        // 关闭这个线程
        worker.terminate();
        result[i] = e.data;
        finishCount++;
        // 当finishCount的值等于线程数量，说明所有线程都结束了
        if (finishCount === actualThreadCount) {
          // 最后得到result的结果是 [[...],[...],[...]]，所以要拍扁
          resolve(result.flat());
        }
      };
    }
  });
};
