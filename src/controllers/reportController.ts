import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ errorFormat: "pretty" });

export const getDashboard = async (request: Request, response: Response) => {
    try {
        const allUsers = await prisma.user.count();
        const allCars = await prisma.car.count();
        const allSales = await prisma.sale.count();

        // Calculate total revenue from all sales by summing related car prices
        const salesWithCars = await prisma.sale.findMany({
            include: { car: { select: { price: true } } }
        });
        const totalRevenue = salesWithCars.reduce((sum, sale) => sum + sale.car.price, 0);

        return response.status(200).json({
            status: true,
            data: {
                allUser: allUsers,
                allCars: allCars,
                totalSales: allSales,
                totalRevenue: totalRevenue
            },
            message: "Dashboard data has been retrieved successfully"
        });
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: `There is an error. ${error}`
        });
    }
}