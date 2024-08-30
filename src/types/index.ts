export interface measureDTO {
  measure_uuid: string,
  measure_datetime: Date, 
  measure_type: string,
  measure_value: number,
  has_confirmed: boolean,
  image_url: string,
  customer_code?: string,
}


export interface updateMeasureDTO {
  image: string;
  measure_datetime: Date;
  measure_type: 'WATER' | 'GAS';
  customer_code: string;
}

export interface imageType {
  filePath: string;
  fileName: string;
}

export interface confirmMeasureDTO {
  measure_uuid: string;
  confirmed_value: number;
}