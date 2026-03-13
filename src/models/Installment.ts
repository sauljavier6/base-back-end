// @/models.ts
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import Credit from "./Credit";

@Table({ tableName: "Installment" })
export default class Installment extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare ID_Installment: number;

  @ForeignKey(() => Credit)
  @Column(DataType.INTEGER)
  declare ID_Credit: number;

  @Column(DataType.INTEGER)
  declare WeekNumber: number;

  @Column(DataType.DATE)
  declare DueDate: Date;

  @Column(DataType.DECIMAL(10,2))
  declare Amount: number;

  @Column(DataType.DECIMAL(10,2))
  declare PaidAmount: number;

  @Column(DataType.STRING)
  declare Status: string; // pending | paid | late

}
