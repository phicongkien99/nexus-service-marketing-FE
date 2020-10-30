import React, { useRef } from "react";
import { Row, Col, Carousel, Image, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Register from "../../../assets/img/register.png";
import Member from "../../../assets/img/member.png";
import Support from "../../../assets/img/support.png";

function HomePageCarouselServicePack(props) {
    const carousel = useRef(null);

    const next = () => {
        carousel.current.next();
    };

    const prev = () => {
        carousel.current.prev();
    };

    const contentStyle = {
        height: "350px",
        width: "33%",
        color: "#fff",
        textAlign: "center",
        background: "#364d79",
    };

    const divStyle = {
        float: 'left',
        marginRight: '60px',
        marginLeft: '62px',
    }
    return (
        <>
            <Button className="arrow-button arrow-button-left" icon={<LeftOutlined />} onClick={prev} />
            <Button className="arrow-button arrow-button-right" icon={<RightOutlined />} onClick={next} />
            <Carousel ref={carousel} autoplay={true} autoplaySpeed={6000} pauseOnHover={true}>

                <div>
                    <div style={divStyle}>
                        <Image src={Register} alt="Register online" />
                        <h2 className="text--blue"><Link to="">Dial-up</Link></h2>
                        <p>
                            Fsend is the first free large file <br/>
                            transfer via email service in Vietnam <br/> 
                            that allows users to send large files
                        </p>
                        <Link className="text--orange" to="">
                            <b><RightOutlined /> Learn more</b>
                        </Link>
                    </div>
                    <div style={divStyle}>
                        <Image src={Register} alt="Register online" />
                        <h2 className="text--blue"><Link to="">Board Band</Link></h2>
                        <p>
                            Fsend is the first free large file <br/>
                            transfer via email service in Vietnam <br/> 
                            that allows users to send large files
                        </p>
                        <Link className="text--orange" to="">
                            <b><RightOutlined /> Learn more</b>
                        </Link>
                    </div>
                    <div style={divStyle}>
                        <Image src={Register} alt="Register online" />
                        <h2 className="text--blue"><Link to="">Land Line</Link></h2>
                        <p>
                            Fsend is the first free large file <br/>
                            transfer via email service in Vietnam <br/> 
                            that allows users to send large files
                        </p>
                        <Link className="text--orange" to="">
                            <b><RightOutlined /> Learn more</b>
                        </Link>
                    </div>
                </div>
                <div>
                <div style={divStyle}>
                        <Image src={Register} alt="Register online" />
                        <h2 className="text--blue"><Link to="">Dial-up</Link></h2>
                        <p>
                            Fsend is the first free large file <br/>
                            transfer via email service in Vietnam <br/> 
                            that allows users to send large files
                        </p>
                        <Link className="text--orange" to="">
                            <b><RightOutlined /> Learn more</b>
                        </Link>
                    </div>
                    <div style={divStyle}>
                        <Image src={Register} alt="Register online" />
                        <h2 className="text--blue"><Link to="">Board Band</Link></h2>
                        <p>
                            Fsend is the first free large file <br/>
                            transfer via email service in Vietnam <br/> 
                            that allows users to send large files
                        </p>
                        <Link className="text--orange" to="">
                            <b><RightOutlined /> Learn more</b>
                        </Link>
                    </div>
                    <div style={divStyle}>
                        <Image src={Register} alt="Register online" />
                        <h2 className="text--blue"><Link to="">Land Line</Link></h2>
                        <p>
                            Fsend is the first free large file <br/>
                            transfer via email service in Vietnam <br/> 
                            that allows users to send large files
                        </p>
                        <Link className="text--orange" to="">
                            <b><RightOutlined /> Learn more</b>
                        </Link>
                    </div>
                </div>
                <div>
                <div style={divStyle}>
                        <Image src={Register} alt="Register online" />
                        <h2 className="text--blue"><Link to="">Dial-up</Link></h2>
                        <p>
                            Fsend is the first free large file <br/>
                            transfer via email service in Vietnam <br/> 
                            that allows users to send large files
                        </p>
                        <Link className="text--orange" to="">
                            <b><RightOutlined /> Learn more</b>
                        </Link>
                    </div>
                    <div style={divStyle}>
                        <Image src={Register} alt="Register online" />
                        <h2 className="text--blue"><Link to="">Board Band</Link></h2>
                        <p>
                            Fsend is the first free large file <br/>
                            transfer via email service in Vietnam <br/> 
                            that allows users to send large files
                        </p>
                        <Link className="text--orange" to="">
                            <b><RightOutlined /> Learn more</b>
                        </Link>
                    </div>
                    <div style={divStyle}>
                        <Image src={Register} alt="Register online" />
                        <h2 className="text--blue"><Link to="">Land Line</Link></h2>
                        <p>
                            Fsend is the first free large file <br/>
                            transfer via email service in Vietnam <br/> 
                            that allows users to send large files
                        </p>
                        <Link className="text--orange" to="">
                            <b><RightOutlined /> Learn more</b>
                        </Link>
                    </div>
                </div>
            </Carousel>
        </>
    );
}

export default HomePageCarouselServicePack;
