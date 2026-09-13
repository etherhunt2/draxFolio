'use client';

import LaptopComponent from './LaptopComponent';
import Link from 'next/link';

//Eva The Label
import eva1 from '@/public/portfolio/evaTheLabel/eva1.png';
import eva2 from '@/public/portfolio/evaTheLabel/eva2.png';
import eva3 from '@/public/portfolio/evaTheLabel/eva3.png';
import eva4 from '@/public/portfolio/evaTheLabel/eva4.png';
import eva5 from '@/public/portfolio/evaTheLabel/eva5.png';
import eva6 from '@/public/portfolio/evaTheLabel/eva6.png';

//Goblu EV
import goblu1 from '@/public/portfolio/gobluEV/goblu1.png';
import goblu2 from '@/public/portfolio/gobluEV/goblu2.png';
import goblu3 from '@/public/portfolio/gobluEV/goblu3.png';
import goblu4 from '@/public/portfolio/gobluEV/goblu4.png';
import goblu5 from '@/public/portfolio/gobluEV/goblu5.png';
import goblu6 from '@/public/portfolio/gobluEV/goblu6.png';

//Salaada
import salad1 from '@/public/portfolio/Saladaa/salad1.png';
import salad2 from '@/public/portfolio/Saladaa/salad2.png';
import salad3 from '@/public/portfolio/Saladaa/salad3.png';
import salad4 from '@/public/portfolio/Saladaa/salad4.png';
import salad5 from '@/public/portfolio/Saladaa/salad5.png';

//Women Up Fitness
import fitness1 from '@/public/portfolio/womenUP/fitness1.png';
import fitness2 from '@/public/portfolio/womenUP/fitness2.png';
import fitness3 from '@/public/portfolio/womenUP/fitness3.png';
import fitness4 from '@/public/portfolio/womenUP/fitness4.png';
import fitness5 from '@/public/portfolio/womenUP/fitness5.png';
import fitness6 from '@/public/portfolio/womenUP/fitness6.png';
import fitness7 from '@/public/portfolio/womenUP/fitness7.png';

//MR Lioness
import lion1 from '@/public/portfolio/mrLioness/lion1.png';
import lion2 from '@/public/portfolio/mrLioness/lion2.png';
import lion3 from '@/public/portfolio/mrLioness/lion3.png';
import lion4 from '@/public/portfolio/mrLioness/lion4.png';
import lion5 from '@/public/portfolio/mrLioness/lion5.png';
import lion6 from '@/public/portfolio/mrLioness/lion6.png';
import lion7 from '@/public/portfolio/mrLioness/lion7.png';

//ASGEICS INDIA
import a1 from '@/public/portfolio/asgeicsIndia/asgeics1.png'
import a2 from '@/public/portfolio/asgeicsIndia/asgeics2.png'
import a3 from '@/public/portfolio/asgeicsIndia/asgeics3.png'
import a4 from '@/public/portfolio/asgeicsIndia/asgeics4.png'
import a5 from '@/public/portfolio/asgeicsIndia/asgeics5.png'

//Prachar
import p1 from '@/public/portfolio/prachar/prachar1.png'
import p2 from '@/public/portfolio/prachar/prachar2.png'
import p3 from '@/public/portfolio/prachar/prachar3.png'
import p4 from '@/public/portfolio/prachar/prachar4.png'
import p5 from '@/public/portfolio/prachar/prachar5.png'

//Samskara
import sams1 from '@/public/portfolio/samskara/samskara1.png'
import sams2 from '@/public/portfolio/samskara/samskara2.png'
import sams3 from '@/public/portfolio/samskara/samskara3.png'
import sams4 from '@/public/portfolio/samskara/samskara4.png'
import sams5 from '@/public/portfolio/samskara/samskara5.png'
import sams6 from '@/public/portfolio/samskara/samskara6.png'

//LilyMin
import lily1 from '@/public/portfolio/lilymin/lilymin1.png'
import lily2 from '@/public/portfolio/lilymin/lilymin2.png'
import lily3 from '@/public/portfolio/lilymin/lilymin3.png'
import lily4 from '@/public/portfolio/lilymin/lilymin4.png'
import lily5 from '@/public/portfolio/lilymin/lilymin5.png'
import lily6 from '@/public/portfolio/lilymin/lilymin6.png'

//Astro baba
import astro1 from '@/public/portfolio/astroBaba/astro1.png'
import astro2 from '@/public/portfolio/astroBaba/astro2.png'
import astro3 from '@/public/portfolio/astroBaba/astro3.png'
import astro4 from '@/public/portfolio/astroBaba/astro4.png'
import astro5 from '@/public/portfolio/astroBaba/astro5.png'

//Ruvazh blue
import ruv1 from '@/public/portfolio/ruvazh/ruv1.png'
import ruv2 from '@/public/portfolio/ruvazh/ruv2.png'
import ruv3 from '@/public/portfolio/ruvazh/ruv3.png'
import ruv4 from '@/public/portfolio/ruvazh/ruv4.png'
import ruv5 from '@/public/portfolio/ruvazh/ruv5.png'

const laptopData = [
    {
        images: [eva1, eva2, eva3, eva4, eva5, eva6],
        link: 'https://www.evathelabel.es/',
        alt: 'Eva The Label',
        title: 'Eva The Label',
    },
    {
        images: [sams1, sams2, sams3, sams4, sams5, sams6],
        link: 'https://samskara.app/',
        alt: 'Samakara',
        title: 'Samakara',
    },
    {
        images: [p1, p2, p3, p4, p5],
        link: 'https://pracharr.vercel.app/',
        alt: 'Prachar',
        title: 'Prachar',
    },
    {
        images: [a1, a2, a3, a4, a5],
        link: 'https://asgeicsindia.vercel.app/',
        alt: 'Asgeics India',
        title: 'Asgeics India',
    },
    {
        images: [lily1, lily2, lily3, lily4, lily5, lily6],
        link: 'https://www.lilymin.in/',
        alt: 'LilyMin',
        title: 'LilyMin',
    },
    {
        images: [ruv1, ruv2, ruv3, ruv4, ruv5],
        link: 'https://ruvazh.com/',
        alt: 'Ruvazh',
        title: 'Ruvazh',
    }
    // Add more laptops here with different content
];

export default function LaptopMasonry() {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen pb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-6 w-full">
                {laptopData.slice(0, 6).map((laptop, index) => (
                    <LaptopComponent key={index} images={laptop.images} link={laptop.link} alt={laptop.alt} title={laptop.title} />
                ))}
            </div>
            <div className="text-center mt-8">
                <Link href="/portfolio">
                    <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-8 rounded-xl shadow-[0_6px_0_0_#2563eb] active:shadow-[0_0px_0_0_#2563eb] active:translate-y-[6px] transition-all duration-150">
                        View All
                    </button>
                </Link>
            </div>
        </div>
    );
}
