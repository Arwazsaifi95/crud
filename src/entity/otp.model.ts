import { Column, Entity, PrimaryColumn } from "typeorm";
@Entity()
export class Otp {
  @PrimaryColumn()
  id!: string;
  @Column()
  email!: string;
  @Column()
  otp!: string;
  @Column()
  expiry!: Date;
}
