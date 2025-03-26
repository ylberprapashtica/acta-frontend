export enum BusinessType {
  SOLE_PROPRIETORSHIP = 'Sole Proprietorship',
  PARTNERSHIP = 'Partnership',
  LLC = 'Limited Liability Company',
  CORPORATION = 'Corporation',
}

export interface Company {
  id: string;
  businessName: string;
  tradeName: string;
  businessType: BusinessType;
  uniqueIdentificationNumber: string;
  businessNumber: string;
  fiscalNumber: string;
  vatNumber: string;
  registrationDate: string;
  municipality: string;
  address: string;
  phoneNumber: string;
  email: string;
  bankAccount: string;
  logo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCompanyDto {
  businessName: string;
  tradeName: string;
  businessType: BusinessType;
  uniqueIdentificationNumber: string;
  businessNumber: string;
  fiscalNumber: string;
  vatNumber: string;
  registrationDate: string;
  municipality: string;
  address: string;
  phoneNumber: string;
  email: string;
  bankAccount: string;
  logo?: string;
} 