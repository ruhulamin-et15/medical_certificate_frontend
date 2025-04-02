import React from "react";
import FitforFlightLetter from "./FitforFlightLetter";
import { FitForFlightRequest } from "@/lib/interface/request.interface";

const FitforFlightLetterMain = ({data, isAdmin} : {data? : FitForFlightRequest, isAdmin? : boolean}) => {
  return (
    <div>
      <FitforFlightLetter data={data} isAdmin={isAdmin}></FitforFlightLetter>
    </div>
  );
};

export default FitforFlightLetterMain;
 