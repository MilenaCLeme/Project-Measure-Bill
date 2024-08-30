import path from 'path';
import fs from 'fs';
import { imageType } from 'src/types';

function dataURItoBuffer(dataURI: string) {
  const splitIndex = dataURI.indexOf(',');
  const base64String = dataURI.substring(splitIndex + 1);
  return Buffer.from(base64String, 'base64');
}

export const uploadImage = async (imageBase: string): Promise<imageType | undefined> => {
  const fileName = `image_${Date.now()}.png`;
  const filePath = path.join(__dirname, '..', '..' , 'images', fileName);

  const imageBuffer = dataURItoBuffer(imageBase);

  fs.writeFile(filePath, imageBuffer, (err) => {
    if (err) {
      return undefined;
    }
  })
    
  return { fileName, filePath };
}