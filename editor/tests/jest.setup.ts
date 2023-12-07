import '@testing-library/jest-dom';
// import "whatwg-fetch"; // jestの中でfetchを使えるようにする。mswのテストをjestに組み込んだ際に使用。
jest.mock('@kartagraph-worker/gameCore.worker?worker', () => {
  return jest.fn().mockImplementation(() => {
    return {
      postMessage: jest.fn(),
      onmessage: null,
    };
  });
});
