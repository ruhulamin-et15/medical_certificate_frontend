"use client";

import { useState } from "react";
import HeaderBg from "@/assets/image/placeholder/pexels-pixabay-267447(1).jpg";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useContactUsMutation } from "@/redux/api/contact";
import Loading from "@/components/ui/Loading";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [contactUs, { isSuccess, isLoading, error }] = useContactUsMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await contactUs({ name, email, message }).unwrap();

      if (isSuccess || !error) {
        setStatus("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error: unknown) {
      setStatus("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {isLoading ? (
        <div className="min-h-screen w-full fixed top-0 left-0 bg-black/25 flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        ""
      )}
      <div className="relative h-[300px] w-full flex items-center justify-center text-center text-white">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${HeaderBg.src}')`,
            backgroundPosition: "center",
            backgroundSize: "cover", // Corrected typo here
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {/* Overlay color */}
        <div className="absolute inset-0 bg-primary opacity-90"></div>

        {/* Text content */}
        <div className="relative z-10 px-2 ">
          <h2 className="text-3xl md:text-5xl font-extralight">Contact Us</h2>
          <p className="mt-2 text-lg font-light">
            Contact us, our team is available for your help. You can approach us
            7 days a week.
          </p>
        </div>
      </div>

      <div className="w-full container  text-center bg-white p-8 ">
        <h2 className="text-4xl mt-10 md:mt-14 lg:mt-20 mb-6 text-center">
          SEND US A MESSAGE
        </h2>
        <p className="mb-6 text-center text-lg text-gray-600">
          If you have any issue regarding the course or feedback on how it could
          improve you can contact us.
        </p>
        <form onSubmit={handleSubmit} className="space-y-2 mx-auto max-w-2xl">
          <div>
            <Input
              name="name-contact"
              id="name-contact"
              type="text"
              autoComplete="name"
              placeholder="Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 !py-3 !border !border-black/25 rounded-none outline-none focus-visible:!ring-0  focus-within:!ring-0 focus:!ring-0"
            />
          </div>
          <div>
            <Input
              name="email-contact"
              id="email-contact"
              autoComplete="email"
              type="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 !py-3 !border !border-black/25 rounded-none outline-none focus-visible:!ring-0  focus-within:!ring-0 focus:!ring-0"
            />
          </div>
          <div>
            <textarea
              name="message"
              autoComplete="false"
              id="message"
              placeholder="Your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full px-3 !py-3 !border !border-black/25 rounded-none outline-none focus-visible:!ring-0  focus-within:!ring-0 focus:!ring-0 minh-[100px]"
            ></textarea>
          </div>
          <Button type="submit" className="py-3 mx-auto">
            SUBMIT
          </Button>
        </form>
        {status && <p className="mt-4 text-center text-sm">{status}</p>}
      </div>
      <p className="mt-8 mb-20 md:mb-32 px-2 lg:mb-40 text-center ">
        Get medical letters effortlessly through our online platform, ensuring a
        hassle-free experience that prioritizes your time.
      </p>
    </div>
  );
}
