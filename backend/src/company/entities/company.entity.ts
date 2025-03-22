import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum BusinessType {
  SOLE_PROPRIETORSHIP = 'Sole Proprietorship',
  PARTNERSHIP = 'Partnership',
  LLC = 'Limited Liability Company',
  CORPORATION = 'Corporation',
}

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  businessName: string;

  @Column()
  tradeName: string;

  @Column({
    type: 'enum',
    enum: BusinessType,
    default: BusinessType.SOLE_PROPRIETORSHIP,
  })
  businessType: BusinessType;

  @Column({ unique: true })
  uniqueIdentificationNumber: string;

  @Column({ unique: true })
  businessNumber: string;

  @Column({ unique: true })
  fiscalNumber: string;

  @Column({ unique: true })
  vatNumber: string;

  @Column({ type: 'date' })
  registrationDate: Date;

  @Column()
  municipality: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  bankAccount: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
} 