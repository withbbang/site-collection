export interface TypeSVG {
  type?: string;
  width?: string;
  height?: string;
  fill?: string;
  stroke?: string;
}

export interface TypeKeyValueForm {
  [key: string]: number | string | boolean;
}

export interface TypeLink {
  id: string;
  title: string;
  url: string;
  description: string;
  category: number;
  degreeOfUnderstanding: number;
  bookmark: string;
  createDt: any;
}

export interface TypeCategory {
  id: string;
  category: number;
  description: string;
}

export interface TypeDegreeOfUnderstanding {
  id: string;
  grade: number;
  description: string;
}
