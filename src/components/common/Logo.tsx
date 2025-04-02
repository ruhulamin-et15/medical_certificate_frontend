import Image from "next/image";
import React from "react";
import LogoImage2 from "@/assets/image/logo/logo-106x96.png";
import Link from "next/link";

const Logo = ({ withBg, sm = false }: { withBg?: boolean; sm?: boolean }) => {
  return (
    <>
      {withBg ? (
        <div className="p-2 bg-white/80 w-fit rounded-tl-lg rounded-br-lg">
          <Link href="/">
            <Image
              alt="Logo"
              priority
              src={LogoImage2}
              height={LogoImage2.width}
              width={LogoImage2.width}
              className="max-w-[100px] md:max-w-[120px]"
            />
          </Link>
        </div>
      ) : sm ? (
        <div className="p-2">
          <Link href="/">
            <Image
              priority
              alt="Logo"
              src={LogoImage2}
              height={70}
              width={70}
              style={{ width: "50px", height: "auto" }}
              className="w-[65px]"
            />
          </Link>
        </div>
      ) : (
        <div className="p-2">
          <Link href="/" className="">
            <Image
              priority
              alt="Logo"
              src={LogoImage2}
              height={LogoImage2.width}
              width={LogoImage2.width}
              className="max-w-[100px] rounded-lg md:max-w-[120px]"
            />
          </Link>
        </div>
      )}
    </>
  );
};

export default Logo;
