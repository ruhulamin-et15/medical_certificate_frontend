import React from "react";
import {
  FaMobileAlt,
  FaMoneyBillAlt,
  FaStethoscope,
  FaThumbsUp,
} from "react-icons/fa";

const ServiceAndStatiestics: React.FC = () => {
  return (
    <div className="bg-[#FFF3EA]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 container flex-col gap-3 md:gap-5 items-center justify-between p-8 rounded-lg md:flex-row md:text-left text-center">
        <div className="flex max-sm:flex-col gap-2 max-sm:mt-3 text-text text-base font-semibold items-center my-2 md:my-0">
          <div className="mr-2 text-3xl">
            <FaMobileAlt />
          </div>
          <p className="m-0">Entirely online – effortless and worry-free</p>
        </div>
        <div className="flex max-sm:flex-col gap-2 max-sm:mt-3 text-text text-base font-semibold items-center my-2 md:my-0">
          <div className="mr-2 text-3xl">
            <FaMoneyBillAlt />
          </div>
          <p className="m-0">All medical certificates for £25</p>
        </div>
        <div className="flex max-sm:flex-col gap-2 max-sm:mt-3 text-text text-base font-semibold items-center my-2 md:my-0">
          <div className="mr-2 text-3xl">
            <FaStethoscope />
          </div>
          <p className="m-0">Qualified British practitioners</p>
        </div>
        <div className="flex max-sm:flex-col gap-2 max-sm:mt-3 text-text text-base font-semibold items-center my-2 md:my-0">
          <div className="mr-2 text-3xl">
            <FaThumbsUp />
          </div>
          <p className="m-0">Leading health platform</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceAndStatiestics;
