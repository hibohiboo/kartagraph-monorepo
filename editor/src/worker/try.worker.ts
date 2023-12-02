let i = 0;
self.addEventListener('message', () => {
  // ここで重たい処理を実行
  // 例: 2秒間待機
  setTimeout(() => {
    // 処理が完了したら、結果をメインスレッドに送信
    self.postMessage(`Heavy process completed: ${i++}`);
  }, 2000);
});

export default {};
