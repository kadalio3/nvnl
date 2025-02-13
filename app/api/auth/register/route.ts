import { RegisterSchema } from "@/lib/zod"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { hash } from "bcrypt-ts"


export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, password } = RegisterSchema.parse(body)

        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if(existingUser) {
            return NextResponse.json(
                { message: "Email telah terdaftar" },
                { status: 400 }
            )
        }

        const hashedPassword = await hash(password, 10)
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })

        return NextResponse.json({
            user: {
                name: user.name,
                email: user.email,
            },
        },
        { status: 201 }
    )
    } catch (error) {
        
    }
}