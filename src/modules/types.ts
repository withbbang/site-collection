export interface TypeSVG {
  type?: string;
  width?: string;
  height?: string;
  fill?: string;
  stroke?: string;
}

export interface TypeKeyValueForm {
  [key: string]: string;
}

export interface TypeLink {
  id: string;
  title: string;
  url?: string;
  description?: string;
  category: string;
  degreeOfUnderstanding: number;
  bookmark: string;
  createDt: any;
}
