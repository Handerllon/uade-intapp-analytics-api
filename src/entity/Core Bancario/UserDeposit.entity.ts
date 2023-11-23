import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Currency {
    ARS = "ARS",
    ETH = "ETH",
    BTC = "BTC"
}

@Entity()
export class CoreBancUserDeposit {

  //usamos eventid ya que esta es la Key
  @PrimaryGeneratedColumn()
  eventId: string;

  @Column({nullable: true})
  createdDate: Date;

  @Column({default:"user_deposit"})
  eventName: string

  @Column({default:"core-bancario"})
  eventSender: string

  @Column({nullable: true})
  username: string;

  @Column({nullable: true})
  amount: string;

  @Column({type: "enum", enum: Currency})
  currency: string;
}