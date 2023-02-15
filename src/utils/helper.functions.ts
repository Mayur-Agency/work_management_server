export function parseBoolean(value: string): boolean {
  switch (value.toLowerCase().trim()) {
    case "true":
    case "1":
    case "yes":
      return true;
    case "false":
    case "0":
    case "no":
      return false;
    default:
      throw new Error("Invalid boolean value");
  }
}
