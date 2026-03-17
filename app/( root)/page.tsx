import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import HeroSection from '../heroSection'
import { sampleBooks } from '@/lib/constants'
import Bookcard from '@/components/Bookcard'

export default function Home() {
    return (
        <div className="wrapper container">
            <HeroSection />
            <div className="library-books-grid">
                {
                    sampleBooks.map((book) => (
                        <Bookcard key={book._id} _id={book._id} title={book.title} author={book.author} slug={book.slug} coverURL={book.coverURL} coverColor={book.coverColor} />
                    ))
                }
            </div>
        </div>
    )
}
