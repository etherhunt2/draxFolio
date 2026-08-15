'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const testimonialVideos = [
    {
        id: 1,
        url: '/testimony/ifb.mp4',
        client: 'Jiří Borč, IFB',
    },
    {
        id: 2,
        url: '/testimony/nikhil.mp4',
        client: 'CEO Of Funded GenZ',
    },
    {
        id: 3,
        url: '/testimony/D.mp4',
        client: 'Aditi Sharma, CEO(Prachar)',
    },
];

const Testimony = () => {
    const containerRef = useRef(null);
    const [activeVideo, setActiveVideo] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeout = useRef(null);

    const handlePrevVideo = () => {
        setActiveVideo((prev) => (prev > 0 ? prev - 1 : testimonialVideos.length - 1));
    };

    const handleNextVideo = () => {
        setActiveVideo((prev) => (prev < testimonialVideos.length - 1 ? prev + 1 : 0));
    };

    useEffect(() => {
        const handleScroll = () => {
            if (isScrolling) return;

            setIsScrolling(true);
            clearTimeout(scrollTimeout.current);

            scrollTimeout.current = setTimeout(() => {
                setIsScrolling(false);
            }, 100);

            if (!containerRef.current) return;

            const container = containerRef.current;
            const { top, height } = container.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (top > windowHeight || top + height < 0) return;

            const scrollProgress = Math.max(0, Math.min(1, -top / (height - windowHeight)));
            const newActiveVideo = Math.floor(scrollProgress * testimonialVideos.length);

            if (newActiveVideo !== activeVideo) {
                setActiveVideo(Math.min(newActiveVideo, testimonialVideos.length - 1));
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeVideo, isScrolling]);

    return (
        <div className="relative w-full ">
            <section
                ref={containerRef}
                className="min-h-fit relative py-20"
            >
                <div className="container mx-auto px-4 h-full relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-20">
                        {/* Left Column - Sticky Heading */}
                        <div className="lg:sticky lg:top-0 lg:h-[80vh] flex items-center">
                            <div className="bg-black/50 p-8 rounded-lg backdrop-blur-sm w-full">
                                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
                                    What Our Clients Say
                                </h2>
                                <p className="text-xl md:text-2xl text-white mb-8 capitalize">
                                    Hear directly from our satisfied clients about their experience while working with me.
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="flex gap-2">
                                        {testimonialVideos.map((_, index) => (
                                            <div
                                                key={index}
                                                className={`h-2 rounded-full transition-all duration-300 ${index === activeVideo ? 'bg-white w-8' : 'bg-gray-600 w-2'}`}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={handlePrevVideo}
                                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={handleNextVideo}
                                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Video Player */}
                        <div className="lg:h-[80vh] flex items-center">
                            <motion.div
                                className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl z-0"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6 }}
                                key={activeVideo}
                            >
                                <iframe
                                    src={testimonialVideos[activeVideo].url}
                                    className="absolute inset-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    loading="lazy"
                                />
                                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded">
                                    {testimonialVideos[activeVideo].client}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Testimony;