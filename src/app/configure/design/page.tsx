import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignConfigurator from "./DesignConfigurator";

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
}

const Page = async ({ searchParams }:PageProps) =>{
    
    const { id } = searchParams;
    
    if(!id || typeof id !== 'string') return notFound();
    
    const confiuration = await db.configuration.findUnique({
        where: { id }
    })

    if(!confiuration) {
        return notFound();
    }

    const { imageUrl, width, height } = confiuration;

    return <DesignConfigurator 
        configId={confiuration.id}
        imageDimensions={{ width, height }}
        imageUrl={imageUrl}
    />


}

export default Page