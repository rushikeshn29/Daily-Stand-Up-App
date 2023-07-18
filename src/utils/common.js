// Structure for response
export class APIResponse {
  constructor(status, message = "", data = "") {
    (this.status = status), (this.message = message), (this.data = data);
  }
}

export function DateFormatter(currentDate) {
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}
