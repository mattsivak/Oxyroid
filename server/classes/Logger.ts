import color from 'colors/safe';

export default class Logger {
  static log(message: string, type: "OKAY" | "ERR" | "WARN" | "INFO" | "NOTE" = "OKAY", from: string): void {
    const time = color.white("[" + new Date().toLocaleString() + "] ");
    const typeColor = type === "OKAY" ? color.green : type === "ERR" ? color.red : type === "WARN" ? color.yellow : type === "INFO" ? color.cyan : color.blue;

    console.log(`${time}${typeColor(type === "ERR" ? "ERR " : type)} ${color.white(from)}: ${message}`);
  }
}
