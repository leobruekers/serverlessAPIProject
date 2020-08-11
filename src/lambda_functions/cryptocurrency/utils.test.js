"use strict";

const utils = require("./utils");
const fetch = require("node-fetch");

jest.mock("node-fetch");

test("should calculate average properly", async () => {
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
  fetch.mockImplementation((url) => {
    if (url === "basicOneField")
      return Promise.resolve({
        json: () => Promise.resolve({ field: 11 }),
      });
    else if (url === "childField")
      return Promise.resolve({
        json: () => Promise.resolve({ parent: { child: 9 } }),
      });
  });

  let average = await utils.getTickersAverage(
    "./src/__mocks__/crypt_exchanges_mock_child_field_two_exchanges.json"
  );

  expect(average).toBe(10);
});

test("should calculate average properly decimal average", async () => {
  fetch
    .mockImplementationOnce((url) => {
      return Promise.resolve({
        json: () => Promise.resolve({ field: 7 }),
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

  expect(average).toBe(7.5);
});

test("should calculate average properly three exchanges", async () => {
  fetch
    .mockImplementationOnce((url) => {
      return Promise.resolve({
        json: () => Promise.resolve({ field: 16 }),
      });
    })
    .mockImplementationOnce((url) => {
      return Promise.resolve({
        json: () => Promise.resolve({ field: 15 }),
      });
    })
    .mockImplementationOnce((url) => {
      return Promise.resolve({
        json: () => Promise.resolve({ field: 20 }),
      });
    });

  let average = await utils.getTickersAverage(
    "./src/__mocks__/crypt_exchanges_mock_single_field_three_exchanges.json"
  );

  expect(average).toBe(17);
});

test("should calculate average properly four exchanges", async () => {
  fetch
    .mockImplementationOnce((url) => {
      return Promise.resolve({
        json: () => Promise.resolve({ field: 10 }),
      });
    })
    .mockImplementationOnce((url) => {
      return Promise.resolve({
        json: () => Promise.resolve({ field: 15 }),
      });
    })
    .mockImplementationOnce((url) => {
      return Promise.resolve({
        json: () => Promise.resolve({ field: 15 }),
      });
    })
    .mockImplementationOnce((url) => {
      return Promise.resolve({
        json: () => Promise.resolve({ field: 20 }),
      });
    });

  let average = await utils.getTickersAverage(
    "./src/__mocks__/crypt_exchanges_mock_single_field_four_exchanges.json"
  );

  expect(average).toBe(15);
});

test("should calculate average properly one exchange", async () => {
  fetch.mockImplementationOnce((url) => {
    return Promise.resolve({
      json: () => Promise.resolve({ field: 20 }),
    });
  });

  let average = await utils.getTickersAverage(
    "./src/__mocks__/crypt_exchanges_mock_single_field_one_exchange.json"
  );

  expect(average).toBe(20);
});
