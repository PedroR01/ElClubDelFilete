import React, { useState } from "react";
import logoNavbar from "../../img/logos/logoNavbar.png";
import logoBlog from "../../img/portadas/blog_image.png";
import logoIntro from "../../img/logos/logoIntro.png";
import Carousel from "../Carousel";


export default function Academia({ handleClickEvent }) {
    const [currentCurso, setCurrentCurso] = useState("");

    return (
        <section id="academia" className="flex flex-col relative bg-[#FEFFEB] rounded-3xl py-20  shadow-academia gap-9 md:rounded-[4rem] md:pt-24 md:mt-44 transition-transform duration-300 -translate-y-12">
            <h2 className="rye-regular text-[#2B1F12] text-3xl text-center">ACADEMIA</h2>
            <div className="flex justify-center gap-4">
                <Carousel images={[logoBlog, logoIntro, logoNavbar]} clickHandler={(imgClicked) => handleClickEvent(imgClicked)} />
            </div>
        </section>
    );
}