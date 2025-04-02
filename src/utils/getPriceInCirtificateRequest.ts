import certificates from "../../public/cardData.json";
/**
 * Utility function to retrieve pricing information for a given certificate
 *
 * @param {string} pathname - The current route pathname from the application
 * @param {CertificateType[]} certificateData - Array of certificate data to search through
 * @returns {{ price1: number; price2: number }} - Returns both original (price1) and discounted prices (price2)
 */
export const getPrices = (
  pathname: string,
  isAdmin?: boolean
  //   certificateData: any[]
): { price1: number; price2: number; path: string; name: string } => {
  // Extract the certificate ID from the pathname
  const path = pathname.split("/")[isAdmin ? 3 : 2];

  // Find the certificate by ID in the provided data array
  const certificate = certificates.find((cert) => cert.id === path);
  const name: string = certificate?.title as string;

  // Safely retrieve prices with fallback values of 0
  const price1: number = (certificate?.pricing?.discountedPrice as number) ?? 0;
  const price2: number = (certificate?.pricing?.originalPrice as number) ?? 0;

  // Return both prices if available, else return null if both prices are zero

  return { price1, price2, path, name };
};
