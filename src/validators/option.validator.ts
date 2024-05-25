// bg-zinc-900 border-zinc-900
// bg-blue-950 border-blue-950
// bg-rose-950 border-rose-950
// bg-pink-200 border-pink-200
// bg-green-200 border-green-200
// bg-amber-500 border-amber-500
// bg-red-700 border-red-700

import { PRODUCT_PRICES } from "@/config/products"

export const COLORS = [
    {label: 'Black', value: 'black', tw: 'zinc-900'},
    {label: 'Blue', value: 'blue', tw: 'blue-950'},
    {label: 'Rose', value: 'rose', tw: 'rose-950'},
    // {label: 'Red', value: 'red', tw: 'red-700'},
    // {label: 'Pink', value: 'pink', tw: 'pink-200'},
    // {label: 'Mint', value: 'mint', tw: 'green-200'},
    // {label: 'Amber', value: 'amber', tw: 'amber-500'},
] as const

export const MODELS = {
    name: "models",
    options: [
        {
            label: "iPhone X", 
            value: "iphonex",
        },
        {
            label: "iPhone 11", 
            value: "iphone11",
        },
        {
            label: "iPhone 12", 
            value: "iphone12",
        },
        {
            label: "iPhone 13", 
            value: "iphone13",
        },
        {
            label: "iPhone 14", 
            value: "iphone14",
        },
        {
            label: "iPhone 16", 
            value: "iphone16",
        },
    ],
} as const

export const MATERIALS = {
    name: "material",
    options: [
        {
            label: "Silicone", 
            value: "silicone",
            description: undefined,
            price: PRODUCT_PRICES.material.silicone,
        },
        {
            label: "Polycarbonate", 
            value: "polycarbonate",
            description: "Scratch-resistant coating",
            price: PRODUCT_PRICES.material.polycarbonate,
        },
    ],
} as const


export const FINISHES = {
    name: "finish",
    options: [
        {
            label: "Smooth Finish", 
            value: "smooth",
            description: undefined,
            price: PRODUCT_PRICES.finish.smooth,
        },
        {
            label: "Textured Finish", 
            value: "textured",
            description: "Soft grippy texture",
            price: PRODUCT_PRICES.finish.textured,
        },
    ],
} as const