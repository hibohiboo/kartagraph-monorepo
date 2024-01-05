import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
// import "whatwg-fetch"; // jestの中でfetchを使えるようにする。mswのテストをjestに組み込んだ際に使用。
jest.mock('@kartagraph-worker/gameCore.worker?worker', () => {
  return jest.fn().mockImplementation(() => {
    return {
      postMessage: jest.fn(),
      onmessage: null,
    };
  });
});

// esm用。global空間にjestを登録する。
// https://japanese-document.github.io/tips/2023/javascript-jest-is-not-defined.html
global.jest = jest;
