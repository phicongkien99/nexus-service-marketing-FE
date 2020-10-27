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
            <Carousel ref={carousel}>
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
        </>
    );
}

export default HomePageCarousel;
