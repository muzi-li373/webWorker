import SparkMD5 from "spark-md5";

/**
 * 将文件分片的主函数
 * @param {File} file - 用户选择的文件对象
 * @returns {Promise<Array>} - 返回分片数组
 */
export const createChunk = (file, index, chunkSize) => {
  return new Promise((resolve) => {
    const start = index * chunkSize;
    const end = start + chunkSize;

    // SparkMD5用于计算hash值
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();

    // 每一片的blob对象
    const blob = file.slice(start, end);

    fileReader.onload = (e) => {
      // 将分片内容添加到spark中
      spark.append(e.target.result);
      // 返回这个分片的所有信息
      resolve({
        start, // 分片起始位置
        end, // 分片结束位置
        index, // 分片索引
        hash: spark.end(), // 这一片的hash值
        blob, // 分片数据
      });
    };
    fileReader.readAsArrayBuffer(blob);
  });
};
