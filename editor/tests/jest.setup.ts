import { Blob, File } from 'node:buffer';
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

//  ReferenceError: ReadableStream is not defined      が出るため、以下のコードを追加
// https://github.com/nodejs/undici/issues/2512
import { ReadableStream } from 'node:stream/web';
Object.defineProperties(globalThis, { ReadableStream: { value: ReadableStream } });

// MSWのコンパイルでエラーが出るため、以下のコードを追加
// https://mswjs.io/docs/migrations/1.x-to-2.x#requestresponsetextencoder-is-not-defined-jest
import { TextEncoder, TextDecoder } from 'util';
Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
});
import { fetch, Headers, FormData, Request, Response } from 'undici';
Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  File: { value: File },
  Headers: { value: Headers },
  FormData: { value: FormData },
  Request: { value: Request },
  Response: { value: Response },
});
