import React from 'react';
import aboutUsImage from '../img/about-img.jpg';

export default function AboutUs() {
  return (
    <article className=''>
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row lg:justify-between pt-28 pb-12 px-8">
        <div className="lg:w-1/2 lg:pr-4 max-w-[1280px]">
          <h1 className="text-3xl font-bold mb-4">About Us</h1>

          <p className="text-base leading-relaxed mb-4">
            Welcome to Millennium Cooperative Society, where financial collaboration meets empowerment. Our platform brings together a community of individuals passionate about fostering financial growth and stability through mutual support.
          </p>

          <p className="text-base leading-relaxed mb-4">
            At Millennium Cooperative Society, we believe in the power of collective effort to achieve financial goals. Our members pool their resources, contributing funds to create a pool of capital that fuels opportunities for everyone. Whether you're saving for a personal milestone, looking to invest in your future, or need a loan to realize your aspirations, our cooperative model is designed to serve you.
          </p>

          <p className="text-base leading-relaxed mb-4">
            Joining Millennium Cooperative Society means becoming part of a network where members support each other's financial journeys. Through contributions and responsible lending practices, we empower individuals to take control of their finances while fostering a sense of community and trust.
          </p>

          <p className="text-base leading-relaxed mb-4">
            Explore our platform to discover a range of financial services tailored to your needs. From savings and investment opportunities to accessible loans with favorable terms, we provide the tools and resources to help you thrive financially.
          </p>
          
          <p className="text-base leading-relaxed mb-4">
            As a member of Millennium Cooperative Society, you are eligible to collect a loan after contributing for 6 months. Members can be granted a loan up to two times their savings if they save 30 thousand per month, and up to three times if they save 60 thousand per month. Members can also save up to 100 thousand per month. Additionally, members have the option to save for up to 5 months in advance.
          </p>
        </div>

        <div className="lg:w-1/2 lg:pl-4">
          <img src={aboutUsImage} alt="About Us" className="w-full h-auto mb-4 rounded-lg" />

          <p className="text-base leading-relaxed mb-4">
            Experience the difference of a cooperative approach to finance with Millennium Cooperative Society. Together, we can achieve more. Ready to embark on your financial journey? Join Millennium Cooperative Society today and unlock the possibilities of financial empowerment.
          </p>
        </div>
      </div>
    </article>
  );
}
