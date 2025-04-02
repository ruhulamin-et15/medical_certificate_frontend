import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

const DPriority = ({
  image,
  price1,

  handlePriceChange,
  handlePriorityChange,
}: {
  image: string | StaticImport;
  price1: number;
  price2: number;
  handlePriceChange: (e: number) => void;
  handlePriorityChange: (e: string) => void;
  resData?: any;
}) => {
  return (
    <section className="space-y-3 my-10">
      <div>
        <h1 className="text-lg font-bold">Checkout</h1>
        <p className="text-base">
          If your Partner Practitioner determines that telehealth is not
          appropriate for your case, you will be refunded.
        </p>
      </div>
      <hr className="w-full border border-gray-300" />
      <h1 className="text-lg font-bold">
        Priority options: <span className="text-red-600">*</span>
      </h1>
      <div className="flex bg-purple-100 hover:bg-purple-200 active:bg-purple-100 rounded-lg select-none p-4 gap-5 items-center">
        <input
          id="price-1"
          onChange={() => {
            handlePriceChange(price1);
            handlePriorityChange("STANDARD_REQUEST");
          }}
          name="price"
          value={price1}
          defaultChecked
          type="radio"
        />
        <label
          htmlFor="price-1"
          className="flex  cursor-pointer justify-around gap-4 md:gap-8"
        >
          <div className="w-28 max-md:hidden  h-fit my-auto">
            <Image
              width={400}
              height={300}
              src={image}
              className="w-full h-full  object-cover rounded-md"
              alt=""
            />
          </div>
          <div>
            <h1 className="font-bold">EXPRESS REQUEST</h1>
            <p>
              This will be reviewed, signed by a UK health practitioner and sent
              via email.
            </p>
          </div>
          <div className="py-5  flex items-center  text-xl font-bold">
            <p>£{price1}</p>
          </div>
        </label>
      </div>
      {/* <div className="flex hover:bg-purple-100 rounded-lg select-none p-4 gap-5 items-center">
        <input
          id="price-2"
          name="price"
          onChange={() => {
            handlePriceChange(price2);
            handlePriorityChange("RECOMMENDED_EXPRESS");
          }}
          value={price2}
          type="radio"
        />
        <label
          htmlFor="price-2"
          className="flex cursor-pointer justify-around gap-4 md:gap-8"
        >
          <div className="w-52 h-fit max-md:hidden my-auto">
            <Image
              width={400}
              height={300}
              src={image}
              className="w-full h-full  object-cover rounded-md"
              alt=""
            />
          </div>
          <div>
            <h1 className="font-bold">RECOMMENDED EXPRESS REQUESTT</h1>
            <p>
              This will be reviewed, signed by a UK health Practitioner, and
              sent via email. Typically, you can expect to receive it within the
              same day.
            </p>
          </div>
          <div className="py-5 flex items-center text-xl font-bold">
            <p>£{price2}</p>
          </div>
        </label>
      </div> */}
    </section>
  );
};

export default DPriority;
