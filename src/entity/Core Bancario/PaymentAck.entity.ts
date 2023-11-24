import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Currency {
    ARS = "ARS",
    ETH = "ETH",
    BTC = "BTC"
}

@Entity()
export class CoreBancPaymentAck {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column({nullable: true})
  createdDate: Date;

  @Column({default:"payment_ack"})
  eventName: string

  @Column({default:"core-bancario"})
  eventSender: string

  @Column({nullable: true})
  productName: string;

  @Column({nullable: true})
  productPrice: string;

  @Column({nullable: true})
  productAmount: string;

  @Column({nullable: true})
  productMarketplace: string;

  @Column({nullable: true})
  productMarketplaceCUIT: string;

  @Column({nullable: true})
  deliveryLot: string;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  email: string;

  @Column({nullable: true})
  document: string;

  @Column({nullable: true})
  purchaseId: string;

  @Column({type: "enum", enum: Currency})
  paymentMethod: string;
}