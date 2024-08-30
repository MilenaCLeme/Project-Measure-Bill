import { Response, Request } from "express";
import { imageBillCheckConsumptionIA } from "../services/googleGenerative";
import { confirmMeasureDTO, imageType, updateMeasureDTO } from "../types";
import { uploadImage } from "../services/image";
import { prisma } from "../prisma/index";
import { transformDataInMoth, transformDataInYear, extractNumber } from "../functions/index"
import { HOST_BACKEND } from "../secrets";
import { Measure } from "@prisma/client";

class MeasureController {
  public async update(req: Request, res: Response): Promise<any> {
    const { image, measure_type, measure_datetime, customer_code }: updateMeasureDTO  = req.body;

    const readingLocationMonth = await prisma.measure.findFirst({where: {
      AND: [
        {
          customer_code: {
            equals: customer_code,
          }
        },
        {
          measure_datetime: {
            gte: new Date(`${transformDataInYear(measure_datetime)}-${transformDataInMoth(measure_datetime)}-01`),
            lte: new Date(`${transformDataInYear(measure_datetime)}-${transformDataInMoth(measure_datetime)}-31`)
          }
        },
        {
          measure_type: {
            equals: measure_type
          }
        }
      ]
    }});

    if (readingLocationMonth) {
      return res.status(409).json({
        error_code: "DOUBLE_REPORT",
        error_description: "Leitura do mês já realizada"
      });
    }

    const pathImage: imageType | undefined = await uploadImage(image);

    if (!pathImage) {
      return res.status(500).json({
        error_code: "INTERNAL_SERVER_ERROR",
        error_description:  "Erro ao fazer upload da imagem",
      });
    }

    try {
      const readingValue = await imageBillCheckConsumptionIA(pathImage?.filePath,pathImage?.fileName,measure_type);
    
      const createMeasure = await prisma.measure.create({
        data: {
          image_url: `${HOST_BACKEND}${pathImage.fileName}`,
          measure_datetime,
          measure_type,
          customer_code,
          measure_value: extractNumber(readingValue),
        },
        select: {
          image_url: true,
          measure_value: true,
          measure_uuid: true,
        }
      });

      return res.status(200).json(createMeasure);
    
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error_code: "INTERNAL_SERVER_ERROR",
        error_description:  "Erro ao fazer upload da imagem",
      });
    }
  }

  public async confirm(req: Request, res: Response): Promise<any> {
    const { confirmed_value, measure_uuid } : confirmMeasureDTO = req.body;


    const readingLocationUuid = await prisma.measure.findUnique({
      where: {
        measure_uuid
      }
    })

    if (!readingLocationUuid) {
      return res.status(404).json({
        error_code: 'MEASURE_NOT_FOUND',
        error_description: 'Leitura do mês já realizada'
      })
    }

    if (readingLocationUuid && readingLocationUuid.has_confirmed) {
      return res.status(409).json({
        error_code: 'CONFIRMATION_DUPLICATE',
        error_description: 'Leitura do mês já realizada'
      })
    }

    try {
      await prisma.measure.update({
        where: {
          measure_uuid
        },
        data: {
          measure_value: confirmed_value,
          has_confirmed: true,
        }
      })
      
      return res.status(200).json({ sucess: true })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        error_code: "INTERNAL_SERVER_ERROR",
        error_description:  "Erro ao fazer upload da informação",
      });
    }
  }

  public async list(req: Request, res: Response): Promise<any> {
    const customer_code = req.params.customer_code;
    const measure_type = req.query.measure_type as string;

    if (measure_type && measure_type.toLocaleUpperCase() !== 'WATER' && measure_type.toLocaleLowerCase() !== "GAS") {
      return res.status(400).json({
        error_code: 'INVALID_TYPE',
        error_description: 'Tipo de medição não permitida'
      })
    }

    try {
      const measures = await prisma.measure.findMany({
        where: {
          AND: [
            {
              customer_code: {
                equals: customer_code
              }
            },
            {
              measure_type: {
                equals: measure_type,
                mode: "insensitive"
              }
            },
            {
              has_confirmed: {
                equals: true,
              }
            }
          ]
        },
        select: {
          measure_uuid: true, 
          measure_datetime: true,
          measure_type: true,
          has_confirmed: true,
          image_url: true
        }
      })

      if (measures.length === 0) {
        return res.status(404).json({
          error_code: 'MEASURES_NOT_FOUND',
          error_description: 'Nenhuma leitura encontrada'
        })
      }

      return res.status(200).json({
        customer_code,
        measures
      })
    } catch (error) {
      console.log(error)
      return res.status(404).json({
        error_code: "MEASURES_NOT_FOUND",
        error_description:  "Nenhuma leitura encontrada",
      });
    }
  } 
}

export const measureController = new MeasureController();
