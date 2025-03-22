import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    try {
      const company = this.companyRepository.create(createCompanyDto);
      return await this.companyRepository.save(company);
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation code
        const detail = error.detail || '';
        if (detail.includes('uniqueIdentificationNumber')) {
          throw new ConflictException('A company with this Unique Identification Number already exists');
        } else if (detail.includes('businessNumber')) {
          throw new ConflictException('A company with this Business Number already exists');
        } else if (detail.includes('fiscalNumber')) {
          throw new ConflictException('A company with this Fiscal Number already exists');
        } else if (detail.includes('vatNumber')) {
          throw new ConflictException('A company with this VAT Number already exists');
        }
      }
      throw error;
    }
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return company;
  }

  async update(id: string, updateCompanyDto: Partial<CreateCompanyDto>): Promise<Company> {
    try {
      const company = await this.findOne(id);
      Object.assign(company, updateCompanyDto);
      return await this.companyRepository.save(company);
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation code
        const detail = error.detail || '';
        if (detail.includes('uniqueIdentificationNumber')) {
          throw new ConflictException('A company with this Unique Identification Number already exists');
        } else if (detail.includes('businessNumber')) {
          throw new ConflictException('A company with this Business Number already exists');
        } else if (detail.includes('fiscalNumber')) {
          throw new ConflictException('A company with this Fiscal Number already exists');
        } else if (detail.includes('vatNumber')) {
          throw new ConflictException('A company with this VAT Number already exists');
        }
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.companyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
  }
} 