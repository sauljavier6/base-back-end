import { Request, Response } from "express";
import CreditRequest from "../models/CreditRequest";
import sequelize from "../config/database";
import Credit from "../models/Credit";
import Installment from "../models/Installment";
import CreditApplication from "../models/CreditApplication";

export const createSolicitud = async (req: any, res: any) => {
  try {
    const {
      ID_Product,
      ListPrice,
      DownPayment,
      TotalFinanced,
      MonthlyPaymentEstimate,
      FullName,
      IDNumber,
      Phone,
      Street,
      ExtNumber,
      IntNumber,
      Neighborhood,
      ZipCode,
      City,
      StateAddress,
      Occupation,
      CompanyName,
      MonthlyIncome,
      EmploymentStatus,
      YearsAtJob,
      MonthsAtJob,
      Ref1Name,
      Ref1Relation,
      Ref1Phone,
      Ref2Name,
      Ref2Relation,
      Ref2Phone,
    } = req.body;

    const credit = await CreditApplication.create({
      ID_Product,
      ListPrice,
      DownPayment,
      TotalFinanced,
      MonthlyPaymentEstimate,
      FullName,
      IDNumber,
      Phone,
      Street,
      ExtNumber,
      IntNumber,
      Neighborhood,
      ZipCode,
      City,
      StateAddress,
      Occupation,
      CompanyName,
      MonthlyIncome,
      EmploymentStatus,
      YearsAtJob,
      MonthsAtJob,
      Ref1Name,
      Ref1Relation,
      Ref1Phone,
      Ref2Name,
      Ref2Relation,
      Ref2Phone,
      Status: "PENDING",
    });

    return res.status(201).json({
      message: "Credit request created successfully",
      credit,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating credit request" });
  }
};

export const createCreditRequest = async (req: Request, res: Response) => {
  try {
    const { idSale, idCustomer, weeks, weeklyAmount, interestRate } = req.body;

    const creditRequest = await CreditRequest.create({
      ID_Sale: idSale,
      ID_Customer: idCustomer,
      Weeks: weeks,
      WeeklyAmount: weeklyAmount,
      InterestRate: interestRate,
      Status: "PENDING",
    });

    return res.status(201).json(creditRequest);
  } catch (error) {
    return res.status(500).json({ message: "Error creating credit request" });
  }
};

export const getCreditRequests = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;

    const requests = await CreditRequest.findAll({
      where: status ? { Status: status } : {},
      include: ["Sale", "Customer"],
    });

    return res.json(requests);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching requests" });
  }
};

export const approveCreditRequest = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const request = await CreditRequest.findByPk(id, { transaction });
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const weeklyAmount = request.get("WeeklyAmount") as number;
    const weeks = request.get("Weeks") as number;

    const credit = await Credit.create(
      {
        ID_Customer: request.get("ID_Customer"),
        ID_Sale: request.get("ID_Sale"),
        TotalAmount: weeklyAmount * weeks,
        RemainingBalance: weeklyAmount * weeks,
        Status: "ACTIVE",
      },
      { transaction },
    );

    // Generar cuotas
    for (let i = 1; i <= weeks; i++) {
      await Installment.create(
        {
          ID_Credit: credit.ID_Credit,
          Amount: weeklyAmount,
          Status: "PENDING",
          DueDate: new Date(Date.now() + i * 7 * 24 * 60 * 60 * 1000),
        },
        { transaction },
      );
    }

    request.Status = "APPROVED";
    await request.save({ transaction });

    await transaction.commit();

    return res.json({ message: "Credit approved", credit });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ message: "Error approving credit" });
  }
};
