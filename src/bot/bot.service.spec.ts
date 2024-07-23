import { Test, TestingModule } from '@nestjs/testing';
import { BotService } from './bot.service';
import * as TelegramBot from 'node-telegram-bot-api';

jest.mock('node-telegram-bot-api');

describe('BotService', () => {
  let service: BotService;
  let mockBot: jest.Mocked<TelegramBot>;

  beforeEach(async () => {
    mockBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
      polling: true,
    }) as jest.Mocked<TelegramBot>;
    jest.spyOn(mockBot, 'sendMessage').mockResolvedValue(Promise.resolve());

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BotService,
        {
          provide: TelegramBot,
          useValue: mockBot,
        },
      ],
    }).compile();

    service = module.get<BotService>(BotService);
    service['bot'] = mockBot;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRandomFunnyStatement', () => {
    it('should return a funny statement', () => {
      const statement = service.getRandomFunnyStatement();
      expect(service['funnyStatements']).toContain(statement);
    });
  });

  describe('handleMessage', () => {
    it('should handle greetings with a funny statement', () => {
      const chatId = 123;
      const funnyStatement = service.getRandomFunnyStatement();
      const message = {
        chat: { id: chatId },
        text: 'hello',
        from: { username: 'hitler_adolf' },
      } as TelegramBot.Message;
      service.handleMessage(message);
      expect(mockBot.sendMessage).toHaveBeenCalledWith(chatId, funnyStatement);
    });

    it('should respond with default message for non-greetings', () => {
      const chatId = 123;
      const defaultMessage =
        'I only respond to greetings like "hello" or "hi".';
      const message = {
        chat: { id: chatId },
        text: 'test',
        from: { username: 'hitler_adolf' },
      } as TelegramBot.Message;
      service.handleMessage(message);
      expect(mockBot.sendMessage).toHaveBeenCalledWith(chatId, defaultMessage);
    });
  });
});
