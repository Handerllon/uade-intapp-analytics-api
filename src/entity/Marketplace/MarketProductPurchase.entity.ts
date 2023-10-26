import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MarketProductPurchase {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column()
  createdDate: Date;

  @Column({default:"purchase"})
  eventName: string

  @Column()
  transactionId: string;

  @Column()
  marketplaceName: string;

  @Column()
  productName: string;

}