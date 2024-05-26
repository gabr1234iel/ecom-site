"use server"

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products"
import { db } from "@/db"
import { Order } from "@prisma/client"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { stripe } from "@/lib/stripe"

export const createCheckoutSession = async ({configId}: {configId: string}) => {
    const configuration = await db.configuration.findUnique({
        where: { id: configId },
    })

    if(!configuration) {
        throw new Error("No such configuration found")
    }

    const { getUser } = getKindeServerSession()
    const user = await getUser()


    if(!user) {
        throw new Error("You need to be logged in")
    }

    const {finish, material} = configuration

    let price = BASE_PRICE
    if(finish === 'textured') {
        price += PRODUCT_PRICES.finish.textured
    }
    if(material === 'polycarbonate') {
        price += PRODUCT_PRICES.material.polycarbonate
    }

    let order: Order | undefined

    const existingOrder = await db.order.findFirst({
        where: {
            userId: user.id,
            configurationId: configuration.id,
        },
    })

    if(existingOrder) {
        order = existingOrder       
    } else {
        order = await db.order.create({
            data: {
                userId: user.id,
                configurationId: configuration.id,
                amount: price / 100,
            },
        })
    }

    const product = await stripe.products.create({
        name: "Custom iPhone Case",
        images: [configuration.imageUrl],
        default_price_data: {
            currency: "usd",
            unit_amount: price,
        },
    })

    const stipeSession = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
        payment_method_types: ["card","paypal"],
        mode: "payment",
        shipping_address_collection: {
            allowed_countries: ["MY","SG","US"]
        },
        metadata: {
            userId: user.id,
            orderId: order.id,
        },
        line_items: [{
            price: product.default_price as string, quantity: 1 
        }]
    })


    return { url: stipeSession.url }

}