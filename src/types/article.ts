export enum VatCode {
  ZERO = 0,
  EIGHT = 8,
  EIGHTEEN = 18,
}

export interface Article {
  id: number;
  name: string;
  unit: string;
  code: string;
  vatCode: VatCode;
  basePrice: number;
  companyId: string;
  company?: {
    id: string;
    businessName: string;
  };
}

export interface CreateArticleDto {
  name: string;
  unit: string;
  code: string;
  vatCode: VatCode;
  basePrice: number;
  companyId: string;
}

export interface UpdateArticleDto extends Partial<CreateArticleDto> {} 