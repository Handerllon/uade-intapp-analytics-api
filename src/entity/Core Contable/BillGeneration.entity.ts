import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Currency {
    ARS = "ARS",
    ETH = "ETH",
    BTC = "BTC"
}

@Entity()
export class BillGeneration {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column()
  createdDate: Date;

  @Column({default:"bill_generation"})
  eventName: string

  @Column({default:"core-contable"})
  eventSender: string

  @Column()
  productName: string;

  @Column()
  productPrice: number;

  @Column()
  productAmount: number;

  @Column()
  productMarketplace: string;

  @Column()
  productMarketplaceCUIT: string;

  @Column()
  deliveryLot: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  document: string;

  @Column()
  purchaseId: number;

  @Column({type: "enum", enum: Currency})
  paymentMethod: string;

  @Column()
  billURL: string;
}