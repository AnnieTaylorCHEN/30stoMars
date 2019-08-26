import React from 'react'

export default function Home() {
    return (
        <>
            <section>
                <h1 className="home__title">Thirty Seconds to Mars</h1>
                <video 
                className="home__video"
                width="70%" height="auto" controls muted loop autoPlay playsInline >
                    <source src="/imgs/mars-concert.webm" type="video/webm" />
                    Your browser doesn't support the video tag.
                </video>
                <div className="home__video-text">
                    <p >Join us this summer.</p>
                    <div className="arrow">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </section>
                
            <section className="tour">
                <div className="tour__item">
                    <img src="/imgs/london.jpg" alt="tour london"/>
                    <div className="tour__text">
                        <p>The O2, London</p>
                        <p>July 15</p>
                    </div>
                </div>
                <div className="tour__item">
                    <img src="/imgs/stockholm.jpg" alt="tour stockholm"/>
                    <div className="tour__text">
                        <p>Gröna Lund, Stockholm</p>
                        <p>July 17</p>
                    </div>
                </div>
                <div className="tour__item">
                    <img src="/imgs/berlin.jpg" alt="tour berlin"/>
                    <div className="tour__text">
                        <p>Mercedes-Benz Arena, Berlin</p>
                        <p>July 19</p>
                    </div>
                </div>
                <div className="tour__item">
                    <img src="/imgs/paris.jpg" alt="tour paris"/>
                    <div className="tour__text">
                        <p>Le Grand Rex, Paris</p>
                        <p>July 21</p>
                    </div>
                </div>
                <div className="tour__item">
                    <img src="/imgs/barcelona.jpg" alt="tour barcelona"/>
                    <div className="tour__text">
                        <p>Gran Teatre del Liceu, Barcelona</p>
                        <p>July 25</p>
                    </div>
                </div>
                <div className="tour__item">
                    <img src="/imgs/rome.jpg" alt="tour rome"/>
                    <div className="tour__text">
                        <p>Na Cosetta Estiva, Rome</p>
                        <p>July 28</p>
                    </div>
                </div>
            </section>
        </>
    )
}
