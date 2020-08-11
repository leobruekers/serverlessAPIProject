"use strict";

const utils = require("./utils");
const fetch = require("node-fetch");

jest.mock("node-fetch");

test("should calculate average properly", async () => {
  const resp = { field: 10 };
  fetch
    .mockImplementationOnce((url) => {
      return Promise.resolve({
        json: () => Promise.resolve({ field: 6 }),
      });
    })
    .mockImplementationOnce((url) => {
      return Promise.resolve({
        json: () => Promise.resolve({ field: 8 }),
      });
    });

  let average = await utils.getTickersAverage(
    "./src/__mocks__/crypt_exchanges_mock_single_field_two_exchanges.json"
  );

  expect(average).toBe(7);
});

test("should calculate average on child fields response", async () => {
  const resp = { field: 10 };
  fetch.mockImplementation((url) => {
    if (url === "basicOneField")
      return Promise.resolve({
        json: () => Promise.resolve({ field: 6 }),
      });
    else if (url === "childField")
      return Promise.resolve({
        json: () => Promise.resolve({ parent: { child: 8 } }),
      });
  });

  let average = await utils.getTickersAverage(
    "./src/__mocks__/crypt_exchanges_mock_child_field_two_exchanges.json"
  );

  expect(average).toBe(7);
});

// jest.mock('fs');

// describe('listFilesInDirectorySync', () => {
//   const MOCK_FILE_INFO = {
//     '/path/to/file1.js': 'console.log("file1 contents");',
//     '/path/to/file2.txt': 'file2 contents',
//   };

//   beforeEach(() => {
//     // Set up some mocked out file info before each test
//     require('fs').__setMockFiles(MOCK_FILE_INFO);
//   });

//   test('includes all files in the directory in the summary', () => {
//     const FileSummarizer = require('../FileSummarizer');
//     const fileSummary = FileSummarizer.summarizeFilesInDirectorySync(
//       '/path/to',
//     );

//     expect(fileSummary.length).toBe(2);
//   });
// });

// const utils = require("./utils");

// test("returns success with average of the tickers", async () => {
//   //   const mockCallback = jest.fn(() => {
//   //     return {
//   //       statusCode: 200,
//   //       body: 10,
//   //     };
//   //   });

// //   jest.mock("./utils", () => {
// //     return jest.fn().mockImplementation(() => {
// //       return {
// //         getTickersAverage: jest.fn().mockReturnValue(5),
// //       };
// //     });
// //   });

//   const response = await handler.getAverageTickers();
//   expect(response).toEqual("My First Album");
// });
