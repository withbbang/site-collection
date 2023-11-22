export interface TypeSVG {
  type?: string;
  width?: string;
  height?: string;
  fill?: string;
  stroke?: string;
}

export interface TypeKeyValueForm {
  [key: string]: string | number;
}

export interface TypeLink {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
  degreeOfUnderstanding: number;
  bookmark: string;
  createDt: any;
}

export interface TypeCategory {
  id: string;
  category: string;
  description: string;
}
