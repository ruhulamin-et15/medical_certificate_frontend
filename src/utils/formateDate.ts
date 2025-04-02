// src/utils/dateFormatter.ts
export function formatDate(dateString: string, isTrue?: boolean): string {
  if (!dateString) return "Invalid Date";

  const date = new Date(dateString);

  // Extract date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");


  // Format date string as YYYY-MM-DD HH:mm:ss
  if(isTrue == false || isTrue == undefined){
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  } 
  return `${day}-${month}-${year}`;

}
