import { ChickenpoxCertificateRequest } from "@/lib/interface/request.interface";
import Chickenpox from "./Chickenpox";

export default function ChickenPoxComponent({data, isAdmin} : {data?: ChickenpoxCertificateRequest, isAdmin?: boolean}) {
   
    return (
        <div className="max-w-[50rem] mx-auto">
            <Chickenpox data={data} isAdmin={isAdmin}></Chickenpox>
        </div>
    );
}