"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface Certificate {
  label: string;
  href: string;
}

interface MedicalCertificatesDropdownProps {
  children?: ReactNode;
  item: Certificate[];
  onItemClick?: () => void;
}

export default function Dropdown({
  onItemClick,
  children = "Medical Certificates",
  item: certificates,
}: MedicalCertificatesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseLeave={() => setIsOpen(false)}
      className="relative inline-block"
    >
      {/* Dropdown Button */}
      <button
        // onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="px-2 cursor-pointer py-2 flex items-center gap-2 rounded-md text-lg"
      >
        {children} <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute z-[99999] w-64 bg-white border border-gray-200 shadow-md rounded-md ">
          <ul className="py-2">
            {certificates?.map((cert) => (
              <li key={cert.href} className="w-full">
                <Link
                  href={cert.href}
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  onClick={() => {
                    if (onItemClick !== undefined) onItemClick();

                    setIsOpen(false);
                  }}
                >
                  {cert.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
