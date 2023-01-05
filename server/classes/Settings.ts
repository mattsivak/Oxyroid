import { ColorResolvable } from "discord.js"
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

export default class Settings {
  static token = process.env.TOKEN as string
  static db = "mongodb+srv://bialu:BialuJeTop@cluster0.g5vfi.mongodb.net/discord"
  static developerDiscordGuildId = "1013471462528655441"
  static serverPort = 4000 
  static successColor: ColorResolvable = "#7fff00"
  static errorColor: ColorResolvable = "#ff0000"
  static warningColor: ColorResolvable = "#efaf00"
  static debugMode: boolean = process.env.DEBUG === "on" ? true : false
}
// mongodb+srv://bialu:BialuJeTop@cluster0.g5vfi.mongodb.net/discord
