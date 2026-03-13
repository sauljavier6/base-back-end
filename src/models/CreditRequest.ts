// @/models.ts
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";

@Table({ tableName: "CreditRequest" })
export default class CreditRequest extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare ID_CreditRequest: number;

  @Column(DataType.INTEGER)
  declare ID_Client: number;

  @Column(DataType.DECIMAL(10,2))
  declare RequestedAmount: number;

  @Column(DataType.INTEGER)
  declare Weeks: number; // 20, 40, etc.

  @Column(DataType.STRING)
  declare Status: string; // pending | approved | rejected

}
