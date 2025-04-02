"use client";

import DLink from "@/components/ui/DLink";

export default function PasswordResetConfirmation() {
  return (
    <div className="flex flex-col items-center mt-20 mb-[400px] p-4">
      {/* Success Message Box */}
      <div className="bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-md mb-4 text-center">
        Your password for Login Area has now been reset.
      </div>

      {/* Instructions and Login Link */}
      <p className="text-center text-gray-700 mb-2">
        Login now with your new password:
      </p>
      <DLink href="/login" passHref>
        Go to Login Area
      </DLink>
    </div>
  );
}
