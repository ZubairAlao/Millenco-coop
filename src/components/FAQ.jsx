import React, { useState } from 'react';

// FAQ data
const faqData = [
  {
    question: "How long do I need to be a member before I can apply for a loan?",
    answer: "As a member of Millennium Cooperative Society, you are eligible to collect a loan after contributing for 6 months. Members can be granted a loan up to two times their savings if they save 30 thousand per month, and up to three times if they save 60 thousand per month. Members can also save up to 100 thousand per month. Additionally, members have the option to save for up to 5 months in advance."
  },
  {
    question: "What is the maximum loan amount I can get?",
    answer: "The maximum loan amount you can get depends on your monthly savings. Members can be granted a loan up to two times their savings if they save 30 thousand per month, and up to three times if they save 60 thousand per month. Members can also save up to 100 thousand per month."
  },
  {
    question: "How much can I save per month?",
    answer: "Members can save varying amounts per month based on their financial capacity. You can save 30, 60, or even 100 thousand per month."
  },
  {
    question: "Can I save for multiple months in advance?",
    answer: "Yes, members have the option to save for up to 5 months in advance, providing flexibility and convenience in financial planning."
  },
  {
    question: "What is the attendance requirement for accessing loans?",
    answer: "To have access to a loan, members must have at least an 80 percent payment attendance record."
  },
  {
    question: "Are there any restrictions on how I can use the loan?",
    answer: "While there are no specific restrictions on how you can use the loan, we encourage responsible financial behavior and advise using the loan for productive purposes such as investment, education, or personal development."
  },
  {
    question: "How can I join Millennium Cooperative Society?",
    answer: "Joining Millennium Cooperative Society is simple. You can apply for membership through our website or visit one of our physical branches to get started on your financial journey."
  },
  {
    question: "How can I get more information about specific needs not covered in these FAQs?",
    answer: "Please feel free to send us an email with more details about your specific needs. Our team will be happy to assist you further."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`max-w-screen-xl mx-auto px-8 pb-12`}>
      <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      {faqData.map((item, index) => (
        <div key={index} className="mb-4">
          <div
            className="cursor-pointer bg-[#C8E6C9] dark:bg-[#37474F]  p-4 rounded-md"
            onClick={() => toggleAccordion(index)}
            role="button" 
          >
            <h3 className="text-base lg:text-lg font-bold">{item.question}</h3>
            <svg
              className={`ml-auto transform ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              width="24"
              height="24"
            >
              <path
                fillRule="evenodd"
                d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-.707.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {activeIndex === index && (
            <div className="bg-gray-200 text-[#333333] p-4 rounded-b-md">
              <p className="text-sm lg:text-base leading-relaxed">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
