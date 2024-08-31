import { Request, Response } from "express";
import sinon from "sinon";
import { measureController } from "../src/controllers/measureController";
import { uploadImage } from "../src/services/image";
import { imageBillCheckConsumptionIA } from "../src/services/googleGenerative";
import {  updateMeasureDTO } from "../src/types";

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      measure: {
        findFirst: jest.fn(),
        create: jest.fn().mockResolvedValue({
          measure_value: 120,
          measure_uuid: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
          image_url: `http://localhost:8000/images/image_1706408480123.png`,
        }),
        findUnique: jest.fn(),
        update: jest.fn(),
        findMany: jest.fn(),
      },
    })),
  };
});

jest.mock('../src/services/image', () => {
  return {
    uploadImage: jest.fn().mockResolvedValue({
      fileName: 'image_1706408480123.png',
      filePath: '/images/image_1706408480123.png'
    }),
  };
});

jest.mock('../src/services/googleGenerative', () => {
  return {
    imageBillCheckConsumptionIA: jest.fn().mockResolvedValue('120 m³'),
  };
});

describe("MeasureController Update", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  describe("function update", () => {
    beforeEach(() => {
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
    });

    afterEach(() => {
      sinon.restore();
    });

    it("create sucess return 200 with type image_url,  measure_value and measure_uuid", async () => {
      req = {
        body: {
          image:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAALElEQVR42mP8z/C/HwMzkLiA4f9DBTAwMOIYzAGQW3iABRABlUQfABH8BASlWBQDd0AERg4MQ+AAAAAElFTkSuQmCC",
          measure_datetime: new Date("2024-06-13"),
          measure_type: "GAS",
          customer_code: "9b2c4f78-a5c1-42e9-93f6-6586f5f2a7ef",
        } as updateMeasureDTO,
      };

      await measureController.update(req as Request, res as Response);

      sinon.assert.calledWith(res.status as sinon.SinonStub, 200)
      sinon.assert.calledWith(res.json as sinon.SinonStub, {
          image_url: `http://localhost:8000/images/image_1706408480123.png`,
          measure_value: 120,
          measure_uuid: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      })
    });
  });
});
