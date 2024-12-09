import React from "react";
import Button from "../components/Button";
import NovedadDestacada from "../components/NovedadDestacada";
import NovedadSecundaria from "../components/NovedadSecundaria";


export default function NovedadesPage() {
    return (
        <div className="py-10 md:py-40 bg-[#8F272A]">
            <ul className="flex w-11/12 h-auto justify-self-center gap-x-8">
                <li className="content-center">
                    <NovedadDestacada />
                </li>
                <li className="w-[70%]">
                    <ul className="h-wb-fill grid gap-y-8">
                        <li>
                            <NovedadSecundaria />
                        </li>
                        <li>
                            <NovedadSecundaria />
                        </li>
                        <li>
                            <NovedadSecundaria />
                        </li>
                    </ul>
                </li>
            </ul>

            <div className="justify-self-center mt-32">
                <Button
                    text="Ver Más"
                    bgColor="bg-[#DDAA58]"
                    textColor="text-[#8B2A1F]"
                />
            </div>
        </div>
    );
}