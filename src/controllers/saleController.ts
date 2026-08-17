import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"

const prisma = new PrismaClient({ errorFormat: "pretty" })

export const getAllSales = async (request: Request, response: Response) => {
    try {
        const { search } = request.query

        const allSales = await prisma.sale.findMany({
            where: {
                OR: [
                    { buyerName: { contains: search?.toString() || "" } },
                    { car: { name: { contains: search?.toString() || "" } } }
                ]
            },
            orderBy: { saleDate: "desc" },
            include: {
                car: true,
                OrderList: true,
                user: true
            }
        })

        return response.status(200).json({
            status: true,
            data: allSales,
            message: `Sale list has been retrieved`
        })
    } catch (error) {
        return response.status(400).json({
            status: false,
            message: `There is an error. ${error}`
        })
    }
}

export const createSale = async (request: Request, response: Response) => {
    try {
        const { buyerName, id_car } = request.body

        if (!buyerName || !id_car) {
            return response.status(400).json({
                status: false,
                message: "buyerName and id_car are required"
            })
        }

        const findCar = await prisma.car.findUnique({
            where: { id_car: Number(id_car) }
        })

        if (!findCar) {
            return response.status(404).json({
                status: false,
                message: `Car with ID ${id_car} not found`
            })
        }

        const newSale = await prisma.sale.create({
            data: {
                uuid: uuidv4(),
                buyerName,
                carId: Number(id_car),
                userId: null // bisa null karena sudah diubah
            }
        })

        return response.status(200).json({
            status: true,
            data: newSale,
            message: `New Sale has been created`
        })
    } catch (error) {
        return response.status(400).json({
            status: false,
            message: `There is an error. ${error}`
        })
    }
}

export const updateSale = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const { buyerName, id_car } = request.body

        const findSale = await prisma.sale.findUnique({
            where: { id_sale: Number(id) }
        })

        if (!findSale) {
            return response.status(404).json({
                status: false,
                message: `Sale is not found`
            })
        }

        const updatedSale = await prisma.sale.update({
            where: { id_sale: Number(id) },
            data: {
                buyerName: buyerName || findSale.buyerName,
                carId: id_car ? Number(id_car) : findSale.carId
            }
        })

        return response.status(200).json({
            status: true,
            data: updatedSale,
            message: `Sale has been updated`
        })
    } catch (error) {
        return response.status(400).json({
            status: false,
            message: `There is an error. ${error}`
        })
    }
}

export const deleteSale = async (request: Request, response: Response) => {
    try {
        const { id } = request.params

        const findSale = await prisma.sale.findUnique({
            where: { id_sale: Number(id) }
        })

        if (!findSale) {
            return response.status(404).json({
                status: false,
                message: `Sale is not found`
            })
        }

        const deletedSale = await prisma.sale.delete({
            where: { id_sale: Number(id) }
        })

        return response.status(200).json({
            status: true,
            data: deletedSale,
            message: `Sale has been deleted`
        })
    } catch (error) {
        return response.status(400).json({
            status: false,
            message: `There is an error. ${error}`
        })
    }
}
