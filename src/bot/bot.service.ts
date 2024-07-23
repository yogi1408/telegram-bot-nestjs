import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class BotService implements OnModuleInit {
  private bot: TelegramBot;
  private readonly token: string = process.env.TELEGRAM_BOT_TOKEN;
  private readonly logger = new Logger(BotService.name);

  private funnyStatements: string[] = [
    'I told my computer I needed a break, and now it won’t stop sending me Kit-Kats.',
    'Why don’t they play poker in the jungle? Too many cheetahs.',
    'Why did Batman and Robin never use the internet? Because they didn’t want to get caught in the web!',
    'What’s the difference between Iron Man and Aluminum Man? Iron Man stops the bad guys, Aluminum Man just foils their plans.',
    'Why did Spider-Man join the computer club? So he could improve his web design.',
    'Why does Superman get invited to dinners? Because he’s a Supper-man!',
    'Why doesn’t Aquaman share his wealth? Because he’s shellfish!',
  ];

  onModuleInit() {
    this.bot = new TelegramBot(this.token, { polling: true });

    this.bot.on('message', (msg) => {
      this.handleMessage(msg);
    });
  }

  public handleMessage(msg: TelegramBot.Message): string {
    const chatId = msg.chat.id;
    const text = msg.text.toLowerCase();
    this.logger.log(`Incoming message from ${msg.from.username}: ${text}`);

    let response;
    if (text.includes('hello') || text.includes('hi')) {
      response = this.getRandomFunnyStatement();
    } else {
      response = 'I only respond to greetings like "hello" or "hi".';
    }
    this.bot.sendMessage(chatId, response);
    this.logger.log(`Bot response: ${response}`);
    return response;
  }

  public getRandomFunnyStatement(): string {
    return this.funnyStatements[
      Math.floor(Math.random() * this.funnyStatements.length)
    ];
  }
}
