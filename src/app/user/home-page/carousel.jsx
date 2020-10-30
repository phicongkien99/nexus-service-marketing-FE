import React, { useRef } from "react";
import { Carousel, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

function HomePageCarousel(props) {
    const carousel = useRef(null);

    const next = () => {
        carousel.current.next();
    };

    const prev = () => {
        carousel.current.prev();
    };

    const contentStyle = {
        height: "600px",
        width: "100%",
        color: "#fff",
        lineHeight: "160px",
        textAlign: "center",
        background: "#364d79",
    };

    return (
        <>
            <Button className="arrow-button arrow-button-left" icon={<LeftOutlined />} onClick={prev} />
            <Button className="arrow-button arrow-button-right" icon={<RightOutlined />} onClick={next} />
            <Carousel ref={carousel} autoplay={true} autoplaySpeed={4000} pauseOnHover={false}>
                <div>
                    <img style={contentStyle} src="https://fpt.vn/storage/upload/images/banners/banner/gtbb_eng.jpg"/> 
                </div>
                <div> 
                    <img style={contentStyle} src="https://fpt.vn/storage/upload/images/banners/banner/trangchinh_ver_eng-01.jpg"/> 
                </div>
                <div>
                    <img style={contentStyle} src="https://fpt.vn/storage/upload/images/banners/fti/banner_fpt_bgw_en.png"/> 
                </div>
                <div >
                    <img style={contentStyle} src="https://fpt.vn/storage/upload/images/banners/banner/idg-trangchu-eng.jpg"/> 
                </div>
            </Carousel>
        </>
    );
}

export default HomePageCarousel;
