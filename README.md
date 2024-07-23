# Telegram Bot with NestJS

This project demonstrates how to create a simple Telegram bot using NestJS. The bot responds with funny statements to greetings like "hello" or "hi" and provides a default message for other inputs.

## Prerequisites

Before you begin, ensure you have the following installed:

- Install nest.js using `npm i -g @nestjs/cli`

## Setup Instructions

1. **Clone the Repository**

   ```
   git clone https://github.com/yogi1408/telegram-bot-nestjs.git
   cd telegram-bot-nestjs
   ```

## Install Dependencies

   ```npm install```

## Creating a Telegram Bot

To create a Telegram bot and get the token, follow these steps:

1. **Open Telegram App:**

   - On your mobile device or [Telegram Web](https://web.telegram.org/).

2. **Search for BotFather:**

   - In the search bar, type "BotFather" and select the official BotFather bot.

3. **Create a New Bot:**

   - Send the command `/newbot` to BotFather.
   - Follow the prompts to name your bot.
   - BotFather will provide you with a token. Save this token as you will need it for your application.

4. **Search newly created Bot in Telegram:**

   - Search like nest-app-bot in search bar

## Configuration

### Create a .env File

In the root directory of your project, create a `.env` file and add the following line:
 
```TELEGRAM_BOT_TOKEN=your-telegram-bot-token```

## Running the Application

### Start the Application

To start the application, run the following command:

```npm run start```


### Test the Application

To test the application, run the following command:

```npm run test```






