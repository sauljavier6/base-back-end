import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import Product from "./Product";
import Stock from "./Stock";

@Table({
  tableName: "CreditApplication",
  timestamps: true,
  paranoid: true,
})
export default class CreditApplication extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare ID_CreditApplication: number;

  @Column({
    type: DataType.STRING(40),
    allowNull: false,
    unique: true,
  })
  declare Folio: string;

  @Column({
    type: DataType.ENUM(
      "draft",
      "submitted",
      "reviewing",
      "approved",
      "rejected",
      "canceled",
    ),
    allowNull: false,
    defaultValue: "draft",
  })
  declare Status:
    | "draft"
    | "submitted"
    | "reviewing"
    | "approved"
    | "rejected"
    | "canceled";

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare ID_Product: number | null;

  @ForeignKey(() => Stock)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare ID_Stock: number | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare PlanTermMonths: number | null;

  @Column({ type: DataType.DECIMAL(5, 2), allowNull: true, defaultValue: 0 })
  declare AnnualRate: number;

  @Column({ type: DataType.DECIMAL(12, 2), allowNull: true, defaultValue: 0 })
  declare ListPrice: number;

  @Column({ type: DataType.DECIMAL(12, 2), allowNull: true, defaultValue: 0 })
  declare DiscountAmount: number;

  @Column({ type: DataType.DECIMAL(12, 2), allowNull: true, defaultValue: 0 })
  declare DownPayment: number;

  @Column({ type: DataType.DECIMAL(12, 2), allowNull: true, defaultValue: 0 })
  declare TotalFinanced: number;

  @Column({ type: DataType.DECIMAL(12, 2), allowNull: true, defaultValue: 0 })
  declare MonthlyPaymentEstimate: number;

  @Column({ type: DataType.STRING(180), allowNull: false })
  declare FullName: string;

  @Column({ type: DataType.STRING(80), allowNull: false })
  declare IDNumber: string;

  @Column({ type: DataType.STRING(30), allowNull: false })
  declare Phone: string;

  @Column({ type: DataType.STRING(180), allowNull: true })
  declare Street: string | null;

  @Column({ type: DataType.STRING(40), allowNull: true })
  declare ExtNumber: string | null;

  @Column({ type: DataType.STRING(40), allowNull: true })
  declare IntNumber: string | null;

  @Column({ type: DataType.STRING(120), allowNull: true })
  declare Neighborhood: string | null;

  @Column({ type: DataType.STRING(20), allowNull: true })
  declare ZipCode: string | null;

  @Column({ type: DataType.STRING(120), allowNull: true })
  declare City: string | null;

  @Column({ type: DataType.STRING(120), allowNull: true })
  declare StateAddress: string | null;

  @Column({ type: DataType.STRING(140), allowNull: true })
  declare Occupation: string | null;

  @Column({ type: DataType.STRING(160), allowNull: true })
  declare CompanyName: string | null;

  @Column({ type: DataType.DECIMAL(12, 2), allowNull: true, defaultValue: 0 })
  declare MonthlyIncome: number;

  @Column({ type: DataType.STRING(60), allowNull: true })
  declare EmploymentStatus: string | null;

  @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: 0 })
  declare YearsAtJob: number;

  @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: 0 })
  declare MonthsAtJob: number;

  @Column({ type: DataType.STRING(180), allowNull: true })
  declare Ref1Name: string | null;

  @Column({ type: DataType.STRING(80), allowNull: true })
  declare Ref1Relation: string | null;

  @Column({ type: DataType.STRING(30), allowNull: true })
  declare Ref1Phone: string | null;

  @Column({ type: DataType.STRING(180), allowNull: true })
  declare Ref2Name: string | null;

  @Column({ type: DataType.STRING(80), allowNull: true })
  declare Ref2Relation: string | null;

  @Column({ type: DataType.STRING(30), allowNull: true })
  declare Ref2Phone: string | null;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare IDFrontURL: string | null;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare IDBackURL: string | null;

  @BelongsTo(() => Product)
  Product?: Product;

  @BelongsTo(() => Stock)
  Stock?: Stock;
}
