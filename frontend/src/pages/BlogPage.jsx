import React from "react";
import Button from "../components/Button";
import blogImage from "../img/blog_image.png";


export default function BlogPage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-[#942824] p-4">
            <div className="border-4 border-[#DDAA58] bg-[#B14343] p-8 md:p-12 lg:p-16 max-w-lg md:max-w-2xl text-white shadow-lg w-full md:w-auto">
                <div className="flex justify-center mb-4">
                    <img
                        src={blogImage}
                        alt="Logo del Blog"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-left text-[#CDA053]">Título</h2>
                <p className="text-md md:text-lg mb-6">
                    Lorem ipsum dolor sit amet consectetur. Amet malesuada quis nunc fermentum.
                    Condimentum a commodo fringilla sit gravida porta. Proin a bibendum fringilla
                    sed sit cursus mi ac elit. Facilisis sem et potenti lectus augue at.
                </p>
                <Button
                    text="PDF"
                    bgColor={"#DDAA58"}
                    textColor={"#8B2A1F"}
                />
            </div>
        </div>
    );
}