// @/models.ts
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import Sale from "./Sale";


@Table({ tableName: "Credit" })
export default class Credit extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare ID_Credit: number;

  @ForeignKey(() => Sale)
  @Column(DataType.INTEGER)
  declare ID_Sale: number;

  @Column(DataType.DECIMAL(10,2))
  declare TotalAmount: number;

  @Column(DataType.DECIMAL(10,2))
  declare WeeklyAmount: number;

  @Column(DataType.INTEGER)
  declare TotalWeeks: number;

  @Column(DataType.DATE)
  declare StartDate: Date;

  @Column(DataType.STRING)
  declare Status: string; // active | finished | late

}
