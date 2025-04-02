import { useUser } from "@/lib/provider/UserProvider";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const DConfirmDetails = ({ latterType }: { latterType: string }) => {
  const { user } = useUser();
  const details = useSelector((state: RootState) => state.ShowDetailsReducer);

  // console.log(details);
  return (
    <section className="my-10">
      <h1 className="text-xl font-bold">Confirm your details</h1>
      <p>
        Please double check your details below. These will appear on the medical
        letter, if suitable, and can`&#39;t be edited after submission.
      </p>
      <hr className="border w-full my-5 border-gray-400" />
      <div>
        <h1>
          <span className="text-lg font-semibold mr-2">Name:</span>
          {user
            ? `${user?.firstName} ${user?.lastName}`
            : `${details?.firstName ? details?.firstName : ""} ${
                details?.lastName ? details?.lastName : ""
              }`}
        </h1>
        <h1>
          <span className="text-lg font-semibold mr-2">Date of birth:</span>
          <span>{details?.dateOfBirth}</span>
        </h1>
        <h1>
          <span className="text-lg font-semibold mr-2 ">Sex:</span>
          <span>
            {details?.sex &&
              details?.sex?.charAt(0)?.toUpperCase() + details?.sex?.slice(1)}
          </span>
        </h1>
        <h1>
          <span className="text-lg font-semibold mr-2">Email:</span>
          {user ? user?.email : details?.email}
        </h1>
        <h1>
          <span className="text-lg font-semibold mr-2">Mobile:</span>
          <span>
            {user
              ? (user?.phone?.length ?? 0) > 2
                ? user?.phone
                : details.phone
              : details.phone}
          </span>
        </h1>
        <h1 className="">
          <span className="text-lg font-semibold mr-2">Letter type:</span>
          {latterType}
        </h1>
      </div>
    </section>
  );
};

export default DConfirmDetails;
