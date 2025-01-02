# CTFBot

**CTFBot** is a Capture The Flag (CTF) assistant designed to automate common CTF tasks such as flag collection, challenge analysis, and score management. It integrates seamlessly with CTFd and is easy to customize for your needs.

## 🚀 Features

- **CTF Event Management**: Create and manage CTF events.
- **Customizable Commands**: Add or modify commands easily.
- **Database Integration**: Quick and efficient data storage using SQLite.


## 📂 Project Structure

```python
├── commands         # Command definitions
│   ├── ctf          # Commands for CTF operations
│   │   └── NewCommand.ts
│   ├── general      # General utility commands
│   │   └── PingCommand.ts
│   └── test         # Test and debugging commands
│       └── EraseCommand.ts
├── config           # Configuration files
│   └── index.ts
├── database         # Database interactions
│   └── CTFDatabase.ts
├── handlers         # Handlers for commands and events
├── listeners        # Event listeners for bot interactions
├── structures       # Core bot structures
├── typings          # TypeScript type declarations
├── utils            # Utility functions for the bot
└── index.ts         # Bot entry point
```
## ⚙️ Configuration

1. Update the configuration in config/index.ts to match your setup.
2. Create an .env file based on the .env.example template:

```env
TOKEN=your_discord_bot_token
...
```

## 🛠️ Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/UsboKirishima/CTFbot.git
```

2. Install dependencies

```bash
pnpm install
```

3. Run the bot

```bash
pnpm start
```

## 📄 License

#### This project is licensed under the [Apache License 2.0](/LICENSE).

###### Copyright © 2025 UsboKirishima. All rights reserved