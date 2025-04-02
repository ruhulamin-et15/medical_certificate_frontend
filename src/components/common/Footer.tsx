import Link from "next/link";
import Fb from "@/assets/image/logo/tgc-footer-facebook.png";
import In from "@/assets/image/logo/tgc-footer-insta.png";
import Tw from "@/assets/image/logo/tgc-footer-twitter.png";
import Tik from "@/assets/image/logo/tgc-footer-tiktok.png";
import Logo from "./Logo";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-primary print:hidden text-white ">
      <div className="container mx-auto max-2xl:px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Contact Info */}
          <div className="space-y-4">
            <div className="min-[200px]">
              <Logo withBg />
            </div>
            {/* <p>124 City Road, London, EC1V 2NX</p>
            <p>hello@mediconline.uk</p> */}
            {/* <p className="uppercase">Medic Online</p> */}
          </div>

          {/* Need Help? */}
          <div>
            <h3 className="text-[26px]  mb-4">Need Help?</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#faqs">FAQs</Link>
              </li>
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
              {/* <li>
                <Link href="/register">Register / Login</Link>
              </li> */}
              <li>
                <Link href="/medical-letter-verification">
                  Medical Letter Verification
                </Link>
              </li>
              <li>
                <Link href="/order-status">Order Status</Link>
              </li>
            </ul>
          </div>

          {/* Learn all about us */}
          <div>
            <h3 className="text-[26px]  max-md:mt-3  mb-4">
              Learn all about us
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/#how-it-works">How it works</Link>
              </li>
              <li>
                <Link href="/#reviews">Reviews</Link>
              </li>
              <li>
                <Link href="/medical-certificate">Medical Certificates</Link>
              </li>
            </ul>
          </div>

          {/* Legal Stuff */}
          <div>
            <h3 className="text-[26px]  max-md:mt-2  mb-4">Legal Stuff</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/terms">Terms</Link>
              </li>
            </ul>
            <div className="mt-8 space-x-2">
              <Image
                alt="Logo"
                src={Fb}
                height={Fb.height}
                width={Fb.width}
                style={{ width: "40px", height: "auto" }}
                className="w-[40px] inline-block"
              />
              <Image
                alt="Logo"
                src={In}
                height={In.height}
                width={In.width}
                style={{ width: "45px", height: "auto" }}
                className="w-[45px] inline-block"
              />
              <Image
                alt="Logo"
                src={Tw}
                height={Tw.height}
                width={Tw.width}
                style={{ width: "38px", height: "auto" }}
                className="w-[40px] inline-block"
              />
              <Image
                alt="Logo"
                src={Tik}
                height={Tik.height}
                width={Tik.width}
                style={{ width: "38px", height: "auto" }}
                className="w-[40px] inline-block"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-[1px] border-solid border-t-white/30">
        <div className="flex py-6  px-5  justify-center gap-4 flex-wrap container">
          <p className="text-base text-center">
            Copyright © 2025 mediconline.uk
          </p>
          {/* <div className="text-xs text-right">
            {/* Web Design by <span className="font-bold">FMEOS</span> 
          </div> */}
        </div>
      </div>
    </footer>
  );
}
