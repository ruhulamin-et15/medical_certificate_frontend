"use client";
import Image from "next/image";
import certificates from "../../../../../public/cardData.json";
import contentData from "../../../../../public/details.json";
import { useParams } from "next/navigation";
import { FaRegCheckCircle } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import Button from "@/components/ui/Button";
import Link from "next/link";
interface ClinicContent {
  id: string;
  sections: Section[];
}

interface Section {
  section_id: number;
  heading?: string;
  content: Content[];
}

type Content = HeadingContent | ParagraphContent | ListContent;

interface HeadingContent {
  type: "heading";
  level: number;
  text: string;
  style: string;
}

interface ParagraphContent {
  type: "paragraph";
  text: string;
  style: string;
}

interface ListContent {
  type: "list";
  items: ListItem[];
  style: string;
  listType: "default" | "checkmark";
  columns?: Column[];
}

interface ListItem {
  text: string;
  style: string;
}

interface Column {
  items: ListItem[];
}
function ConsultDetails() {
  const { id } = useParams();
  // Find the certificate by ID
  const certificate = certificates.find((item) => item.id === (id as string));
  const data: ClinicContent[] | undefined = [];
  const content = contentData.find((item) => item.id === (id as string));
  if (!content) {
    return <p>No content found for this ID</p>;
  }

  data.push(content as ClinicContent);
  // If no certificate is found, handle the case
  if (!certificate) {
    return <div>Certificate not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Flex container with reverse direction on mobile */}
      <div className="flex flex-col-reverse lg:flex-row bg-white md:p-8">
        {/* Image Section (First on mobile, second on desktop) */}
        <div className="lg:w-2/3 w-full mb-6 md:mb-0">
          <h1 className="text-3xl md:text-5xl max-sm:mt-5 max-lg:mt-10 font-bold text-primary mb-8">
            {certificate.title}
          </h1>

          <Image
            src={certificate.imageUrl}
            alt="Doctors working"
            width={200}
            height={100}
            className="rounded-lg w-full h-auto"
          />

          <div className="sm:container mx-auto md:p-6">
            {data?.map((item) => (
              <div key={item!.id} className="mb-8">
                {item!.sections.map((section) => (
                  <div key={section.section_id}>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 mt-5 md:mt-10 text-primary">
                      {section.heading}
                    </h3>
                    {section.content.map((contentItem, index) => {
                      switch (contentItem.type) {
                        case "heading":
                          return (
                            <h3
                              key={index}
                              className={`!text-xl md:text-2xl font-extrabold mb-4 text-primary ${
                                contentItem.style as string
                              }`}
                            >
                              {contentItem.text}
                            </h3>
                          );
                        case "paragraph":
                          return (
                            <p
                              key={index}
                              className={`mb-2 text-sm sm:text-base  ${contentItem.style}`}
                            >
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: contentItem.text,
                                }}
                              />
                            </p>
                          );
                        case "list":
                          if (contentItem.listType === "checkmark") {
                            return (
                              <ul
                                key={index}
                                className={`list-disc text-sm sm:text-base gap-2 grid sm:grid-cols-2   md:ml-6 mb-6`}
                              >
                                {contentItem?.items?.map((item, idx) => {
                                  const colParts = item.text.split(":");
                                  return (
                                    <div key={idx} className="">
                                      <li className="flex mb-4">
                                        <span className="pt-1 mr-2">
                                          <ImCheckmark />
                                        </span>{" "}
                                        {/* Checkmark */}
                                        <span>
                                          <span className="font-bold   text-primary">
                                            {colParts[0]}:
                                          </span>{" "}
                                          {/* Bold first part */}
                                          <span className="ml-2">
                                            {colParts[1]}
                                          </span>{" "}
                                          {/* Regular second part */}
                                        </span>
                                      </li>
                                    </div>
                                  );
                                })}
                              </ul>
                            );
                          } else {
                            return (
                              <ol
                                key={index}
                                className={`list-disc text-sm sm:text-base  ml-3 pl-2 mb-6`}
                              >
                                {contentItem?.items?.map((item, idx) => {
                                  return (
                                    <li
                                      key={idx}
                                      className={item.style}
                                      dangerouslySetInnerHTML={{
                                        __html: item.text,
                                      }}
                                    ></li>
                                  );
                                })}
                              </ol>
                            );
                          }

                        default:
                          return null;
                      }
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Information Section (Second on mobile, first on desktop) */}
        <div className="lg:w-1/3 max-w-md mx-auto w-full md:pl-8">
          <div className="border rounded-3xl border-sky-800 p-4 sm:p-6">
            <h2 className="text-xl md:text-3xl text-center font-semibold text-primary mb-4">
              Express
            </h2>
            <p className="text-center font-semibold text-2xl md:text-3xl  mb-4">
              {certificate.title}
            </p>
            <ul>
              {certificate.express
                ? certificate?.express?.list.map((item, index) => (
                    <li key={index} className="pt-4 text-sm sm:text-base">
                      <FaRegCheckCircle className="inline" /> {item.text} <br />
                    </li>
                  ))
                : ""}
            </ul>

            {/* Pricing Section */}
            <div className="mt-4 flex flex-row items-center justify-center space-x-4 mb-6">
              {/* <span className="text-gray-500 line-through text-xl md:text-2xl">
                £ {certificate?.pricing?.originalPrice}
              </span> */}

              <span className="text-primary text-center text-2xl md:text-3xl font-bold">
                £{certificate?.pricing?.discountedPrice}
              </span>
              {/* <span className="bg-[#0000FF] text-white text-sm md:text-base px-3 py-1 rounded-full">
                {certificate?.pricing?.discountPercentage}% off
              </span> */}
            </div>

            <div className="w-full mx-auto text-center my-6">
              <Link href={`/request-certificate/${id}`}>
                <Button className="btn font-semibold">
                  Request Medical Certificate
                </Button>
              </Link>
            </div>
            {/* 
            <div className="w-full mx-auto text-center my-6">
              <Link
                href={`/${
                  certificate.buttonType === "Consult Now"
                    ? "consult-now"
                    : "request-certificate"
                }/${id}`}
              >
                <Button className="btn font-semibold">
                  {certificate.buttonType
                    ? certificate.buttonType
                    : "Request Medical Certificate"}
                </Button>
              </Link>
            </div> */}
          </div>

          {/* Delivery Information */}
          <div className="mt-8 text-sm md:text-base">
            <h2 className="text-xl md:text-3xl text-center font-semibold text-primary">
              Express
            </h2>
            <p className="text-center text-2xl">Same day delivery</p>
            {/* <p className="text-center">
              {" "}
              * if you submit the request between 9am to 9pm.
            </p> */}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default ConsultDetails;
