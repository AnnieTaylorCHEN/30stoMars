import React from 'react'

export default function News() {
    return (
        <>
            <section className="news">
                <div className="news__item">
                    <h2>Are you the lucky one?</h2>
                    <img src="/imgs/echelon8.png" alt="thirty seconds to mars concert tickets give away" />
                </div>
                <div className="news__item">
                    <h2>We're going to Europe this summer!</h2>
                    <img src="/imgs/echelon4.png" alt="thirty seconds to mars concert" />
                    <p className="mb">Get your tickets before they run out!</p>
                    <a href="/" className="btn">Ticket</a>
                </div>
                <div className="news__item">
                    <img src="/imgs/echelon5.jpg" alt="thirty seconds to mars concert" />
                    <h2>We love concerts</h2>
                    <p>because we want to be with you guys! </p>
                    <p>You're the best fans in the world!</p>
                </div>
                <div className="news__item">
                    <h2>Let's not forget we live in an amazing country!</h2>
                    <img src="/imgs/echelon1.png" alt="thirty seconds to mars wishes you happy july of 4th" />
                </div>
                <div className="news__item">
                    <img src="/imgs/echelon3.jpg" alt="thirty seconds to mars news walk on water single release" />
                    <p className="mb">Have you check out our new single yet?</p>
                    <a href="/shop" className="btn">Get your copy</a>
                </div>
                <div className="news__item">
                    <img src="/imgs/echelon2.jpg" alt="thirty seconds to mars concert in LA" />
                    <h2>Thank you all echelon </h2>
                    <p>for making the concert last night so amazing!</p>
                </div>
                <div className="news__item">
                    <img src="/imgs/echelon6.jpg" alt="thirty seconds to mars Poland" />
                    <p>This is us chilling out in Poland.</p>
                </div>
                <div className="news__item">
                    <iframe title="City of Angels" src="https://open.spotify.com/embed/track/1dUU2RYiMZ9HCk6CB9Akup" width="260" height="380" frameBorder="0" allow="encrypted-media"></iframe>
                </div>
                <div className="news__item ">
                    <img src="/imgs/echelon7.jpg" alt="up in the air" />
                    <p>In partnership with NASA, Thirty Seconds to Mars launched the first copy of "Up in the Air" aboard the Dragon spacecraft on SpaceX CRS-2. The spacecraft carried a capsule loaded with more than 1,200 pounds of scientific experiments, equipment and the first copy of the song. The mission was launched from the Cape Canaveral Air Force Station atop a Falcon 9 rocket on March 1, 2013. On March 18, 2013, the single premiered from the International Space Station.</p>
                </div>
                <div className="news__item ">
                    <p>A Message from JARED LETO:<br />
                    Someone once said…”Work is the bridge between dreams and reality”. So just be warned: if you have big dreams be ready for a ton of work. So there we were. Deadline city. Once again. A lyric video was needed.</p>
                    <img  src="/imgs/echelon9.jpg" alt="city of angels" />
                    <p className="mb">We got really lucky with some incredibly gorgeous light and maybe some magic from an Owl that kept us company during shooting. If u look close you can even see him fly right by me.
                    Really nice to be able to share such a beautiful sunset with you all.
                    Stay tuned for the short film coming</p>
                    <a href="https://www.youtube.com/watch?v=xtk8ro_eJZE" className="btn">Check out the video</a>
                </div>
                <div className="news__item news__video">
                    <iframe title="Up in the Air" width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/y9uSyICrtow" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                
            </section>
        </>
    )
}
