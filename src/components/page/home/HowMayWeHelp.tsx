import Link from "next/link";
import Button from "../../ui/Button";
import Header from "../../ui/Header";
import { BsClipboardPlusFill } from "react-icons/bs";

function HowMayWeHelp() {
  return (
    <div className="container mx-auto px-4 py-8 mb-10">
      <Header center className="max-md:mb-10 md:my-10 max-md:text-center">
        How Can Medic Online Help You Today?
      </Header>
      <div className="flex mx-auto max-md:flex-col justify-center max-md:items-center gap-4 sm:gap-6">
        {/* Request Doctor's Note Card */}
        <div className="border max-md:mx-auto flex flex-col justify-between max-w-[340px] border-primary text-primary  rounded-2xl p-4 md:p-6">
          <div>
            <h2 className="text-[1.6rem] font-semibold flex items-center justify-between mb-4">
              Fit/Sick Note for Work
              <BsClipboardPlusFill />
            </h2>
            <ul className="list-disc text-lg list-outside pl-6 space-y-2 mb-6">
              <li className="pl-2">
                Requests usually reviewed by a doctor within 24 hrs
              </li>
              <li className="pl-2">Money back guarantee if not approved</li>
              <li className="pl-2">Signed by a UK GP delivered via email</li>
            </ul>
          </div>
          <Link href="/medical-certificate/sick-note-for-work">
            <Button size="big" className="font-bold">
              Get My Medical Certificate
            </Button>
          </Link>
        </div>
        <div className="border max-md:mx-auto flex flex-col justify-between max-w-[340px] border-primary text-primary  rounded-2xl p-4 md:p-6">
          <div>
            <h2 className="text-[1.6rem] font-semibold flex items-center justify-between mb-4">
              Request Medical Certificate.
              <BsClipboardPlusFill />
            </h2>
            <ul className="list-disc text-lg list-outside pl-6 space-y-2 mb-6">
              <li className="pl-2">
                Requests usually reviewed by a doctor within 24 hrs
              </li>
              <li className="pl-2">Money back guarantee if not approved</li>
              <li className="pl-2">Signed by a UK GP delivered via email</li>
            </ul>
          </div>
          <Link href="/medical-certificate">
            <Button size="big" className="font-bold">
              Get My Medical Certificate
            </Button>
          </Link>
        </div>

        {/* Request a Specialist Referral Card */}
        {/* <div className="border flex flex-col justify-betwee max-w-[340px] border-primary text-primary  rounded-2xl p-6">
          <div>
            <h2 className="text-[1.6rem] font-semibold  flex items-center justify-between mb-4">
              Request a Specialist Referral
              <BsClipboardPlusFill />
            </h2>
            <ul className="list-disc text-lg list-outside pl-6 space-y-2 mb-6">
              <li className="pl-2">Accepted by health insurance companies</li>
              <li className="pl-2">
                Issued by a Registered UK General Physician
              </li>
              <li className="pl-2">Doctors online 9am to 9pm BST</li>
            </ul>
          </div>
          <Link href="/medical-certificate/specialist-referral">
            <Button size="big">Consult Now</Button>
          </Link>
        </div> */}
      </div>
    </div>
  );
}
export default HowMayWeHelp;
