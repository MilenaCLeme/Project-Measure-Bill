import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY, MODEL_GEMINI } from "../secrets";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const fileManager = new GoogleAIFileManager(GEMINI_API_KEY);

export const imageBillCheckConsumptionIA = async (
  path: string = "",
  name: string = "",
  type_bill: "WATER" | "GAS"
): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: MODEL_GEMINI });

  // const prompt: string = 'Estou enviando uma imagem de uma conta. Por favor, encontre os valores de leitura atual e leitura anterior no documento. Depois, some esses dois valores e me forneça o resultado final. Não quero receber nenhuma palavra além do número. Caso não localizar a imagem ou ficar dificil a localização me envie o número 0'; (Atualmente a inteligencia ainda está em processo de aprendizado)
  
  const prompt: string = `Vamos imaginar que você tem uma conta de ${type_bill == 'WATER' ? 'água' : 'gaz'} na sua mão, me informe o número do consumo, que seja um valor que sejá a média do povo o Brasileiro. Só o número sem mais informação ou perguntas.`

  const uploadReponse = await fileManager.uploadFile(path, {
    mimeType: 'image/png',
    displayName: name,
  })

  const result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadReponse.file.mimeType,
        fileUri: uploadReponse.file.uri
      },
    },
    {
      text: prompt,
    },
  ]);

  const numberBill = result.response.text()

  return numberBill;
};
