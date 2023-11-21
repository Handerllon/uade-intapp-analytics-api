import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Currency {
    ARS = "ARS",
    ETH = "ETH",
    BTC = "BTC"
}

@Entity()
export class UserDeposit {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column()
  createdDate: Date;

  @Column({default:"user_deposit"})
  eventName: string

  @Column({default:"core-bancario"})
  eventSender: string

  @Column()
  username: string;

  @Column()
  amount: string;

  @Column({type: "enum", enum: Currency})
  currency: string;
}