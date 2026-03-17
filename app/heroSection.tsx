import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function HeroSection() {
    return (
        <section className="wrapper pt-28 mb-10 md:mb-16">
            <div className="library-hero-card">
                <div className="library-hero-content">

                    {/* Left Column */}
                    <div className="library-hero-text">
                        <h1 className="library-hero-title">Your Library</h1>
                        <p className="library-hero-description">
                            Convert your books into interactive AI conversations.
                            <br />
                            Listen, learn, and discuss your favorite reads.
                        </p>
                        <Link href="/books/new" className="library-cta-primary">
                            <span className="text-2xl font-light leading-none mr-1">+</span> Add new book
                        </Link>
                    </div>

                    {/* Center Column */}
                    <div className="library-hero-illustration-desktop md:block hidden">
                        <Image
                            src="/assets/hero-illustration.png"
                            alt="Vintage books, globe and a lamp"
                            width={340}
                            height={250}
                            priority
                            className="object-contain"
                        />
                    </div>

                    {/* Right Column */}
                    <div className="library-steps-card min-w-[280px]">
                        <div className="flex flex-col gap-5">
                            <div className="library-step-item">
                                <div className="library-step-number">1</div>
                                <div>
                                    <h3 className="library-step-title">Upload PDF</h3>
                                    <p className="library-step-description">Add your book file</p>
                                </div>
                            </div>
                            <div className="library-step-item">
                                <div className="library-step-number">2</div>
                                <div>
                                    <h3 className="library-step-title">AI Processing</h3>
                                    <p className="library-step-description">We analyze the content</p>
                                </div>
                            </div>
                            <div className="library-step-item">
                                <div className="library-step-number">3</div>
                                <div>
                                    <h3 className="library-step-title">Voice Chat</h3>
                                    <p className="library-step-description">Discuss with AI</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default HeroSection