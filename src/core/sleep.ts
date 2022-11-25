/**
 * 処理をスリープする。
 * @param {number} ms スリープする秒数[ms]
 * @returns {Promise<void>} Promiseオブジェクト
 */
const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default sleep
