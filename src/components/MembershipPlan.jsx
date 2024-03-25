import React from 'react';
import basicPlanPic from "../img/basic-plan.jpg";
import businessPlanPic from "../img/business-plan.jpg";
import PremiumPlanPic from "../img/premium-plan.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const plans = [
    {
        id: 1,
        planName: "Basic Package",
        amount: "₦30,000",
        planBenefits: [
            { id: 1, benefit: "Times two Loan." },
            { id: 2, benefit: "Financial advisory services." }
        ],
        image: basicPlanPic
    },
    {
        id: 2,
        planName: "Business Package",
        amount: "₦60,000",
        planBenefits: [
            { id: 1, benefit: "Times three Loan." },
            { id: 2, benefit: "premium advisory services." },
            { id: 3, benefit: "Personalized financial advisory." },
        ],
        image: businessPlanPic
    },
    {
        id: 3,
        planName: "Premium Package",
        amount: "₦100,000",
        planBenefits: [
            { id: 1, benefit: "Times three Loan." },
            { id: 2, benefit: "Priority customer support." },
            { id: 4, benefit: "Exclusive investment strategies." },
        ],
        image: PremiumPlanPic
    }
];

const MemberShipCard = ({ memberPlan }) => {

    const backgroundStyles = {
        backgroundImage: `url(${memberPlan.image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
    };

    return (
        <div className="bg-[#C8E6C9] dark:bg-[#37474F] max-w-60 h-[400px] rounded-xl overflow-hidden shadow-lg relative px-2 pt-24 pb-2 grid">
            <div className='absolute inset-0 h-24 w-full overflow-hidden' style={backgroundStyles}></div>
            <div className="px-6 py-4">
                <h3 className="font-bold text-lg mb-2 text-[#2E7D32] dark:text-[#ff6f00] text-center">{memberPlan.planName}</h3>
                <ul>
                {memberPlan.planBenefits.map(benefit => (
                        <li key={benefit.id} className='text-sm'>
                            <FontAwesomeIcon icon={faCircleCheck} className="text-[#2E7D32] dark:text-[#ff6f00] mr-2" />
                            {benefit.benefit}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="py-4 place-self-end w-40 mx-auto flex flex-col gap-2 justify-center items-center">
                <span className="bg-[#2E7D32] dark:bg-[#ff6f00] text-white rounded-full px-3 py-1 text-sm font-semibold w-34 flex justify-center">{memberPlan.amount}/Month</span>
                <button className="border-double border-4 bg-transparent px-4 py-2 text-sm font-semibold rounded-full border-[#388E3C] hover:bg-[#388E3C] dark:border-[#ff6f00] dark:hover:bg-[#ff6f00] hover:text-white transition duration-300">
                    Choose Package
                </button>
            </div>
        </div>
    );
};

export default function MembershipPlan() {
    return (
        <div className="container mx-auto py-12 px-8 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-4">MemberShip Package</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
                {plans.map(plan => (
                    <MemberShipCard key={plan.id} memberPlan={plan} />
                ))}
            </div>

        </div>
    );
}
