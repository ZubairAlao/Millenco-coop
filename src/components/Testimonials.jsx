import React from 'react'
import toyinPic from "../img/toyin.png"
import adePic from "../img/ade.png"
import lawalPic from "../img/lawal.png"


const testimonialsData = [
  {
    id: 1,
    name: "Femi Adetunji",
    role: "Owner, Ade Transport",
    text: "Millennium Cooperative Society has been instrumental in expanding my transport business. With their support, I was able to purchase new vehicles and hire more drivers, significantly increasing my revenue.",
    image: adePic
  },
  {
    id: 2,
    name: "Toyin Ogunola",
    role: "CEO, Ogun Enterprises",
    text: "As a business owner, access to capital is crucial for growth. Thanks to the loan society, I was able to invest in new equipment and technology for my manufacturing company, leading to increased productivity and profitability.",
    image: toyinPic
  },
  {
    id: 3,
    name: "Tunde Lawal",
    role: "Founder, Lawal Retail Stores",
    text: "Securing loans from the Millennium Cooperative Society has been a game-changer for my retail business. I used the funds to expand my store locations, purchase inventory in bulk. This has resulted in higher sales and customer satisfaction.",
    image: lawalPic
  }
];

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-[#C8E6C9] dark:bg-[#37474F] max-w-[75%] md:max-w-56 lg:max-w-72 mx-auto rounded-lg overflow-hidden shadow-lg px-6 py-4">
      <p className="text-base">"{testimonial.text}"</p>
      <div className="flex justify-center items-center gap-1 p-4">
        <div className='w-12 h-12 overflow-hidden rounded-full bg-[#2E7D32] dark:bg-[#ff6f00]'>
          <img className="mx-auto" src={testimonial.image} alt={testimonial.name} />
        </div>
        <div className="leading-3">
          <h1 className="font-bold text-base text-[#2E7D32] dark:text-[#ff6f00] text-center">{testimonial.name}</h1>
          <span className="inline-block text-xs text-center">{testimonial.role}</span>
      </div>
      </div>
    </div>
  );
};


export default function Testimonials() {
  return (
    <div className="container mx-auto py-12 max-w-2xl md:max-w-3xl lg:max-w-4xl">
      <h2 className="text-3xl font-bold text-center mb-4">Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testimonialsData.map(testimonial => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  )
}
