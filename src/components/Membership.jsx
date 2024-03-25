import React from 'react'

export default function Membership() {
  return (
    <div className="max-w-screen-xl mx-auto pt-28 pb-12 px-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Membership</h2>
      <p className="text-base leading-relaxed mb-4">
        Thank you for considering joining Millennium Cooperative Society! Becoming a member offers numerous benefits and opportunities for financial growth and stability. Below, you'll find information about the membership requirements and how to join our cooperative.
      </p>
      <h3 className="text-xl lg:text-2xl font-bold mb-4">Membership Requirements</h3>
      <ul className="list-disc ml-8 mb-4">
        <li className="text-base leading-relaxed">Be of legal age to enter into a contract.</li>
        <li className="text-base leading-relaxed">Agree to abide by the cooperative's bylaws and policies.</li>
        <li className="text-base leading-relaxed">Provide necessary identification and contact information.</li>
        <li className="text-base leading-relaxed">Meet any financial requirements for initial membership fees or contributions.</li>
      </ul>
      <h3 className="text-xl lg:text-2xl font-bold mb-4">Joining Process</h3>
      <p className="text-base leading-relaxed mb-4">
        To join Millennium Cooperative Society, follow these simple steps:
      </p>
      <ol className="list-decimal ml-8 mb-4">
        <li className="text-base leading-relaxed">Review the membership requirements and benefits.</li>
        <li className="text-base leading-relaxed">Complete the membership application form either online or in person.</li>
        <li className="text-base leading-relaxed">Submit any required documentation and initial contributions.</li>
        <li className="text-base leading-relaxed">Wait for approval from the cooperative's board of directors.</li>
        <li className="text-base leading-relaxed">Once approved, you'll receive confirmation of your membership and access to our services.</li>
      </ol>
      {/* <div className="text-center">
        <button className="border-double border-4 bg-transparent px-4 py-2 text-sm font-semibold rounded-full border-[#388E3C] hover:bg-[#388E3C] dark:border-[#ff6f00] dark:hover:bg-[#ff6f00] hover:text-white transition duration-300 w-36">
          Join Us
        </button>
      </div> */}
    </div>
  )
}

// Includes a "Join Us" call-to-action button.
    // Outlines membership requirements.
