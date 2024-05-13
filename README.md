# Telegram Bot for Car Information
## Description
This Telegram bot is designed to provide detailed information about cars based on their ID. Users can send a car ID, and the bot returns detailed information about the car. If the information is already present in the database, the bot retrieves it from there. If not, the bot automatically parses data from Kolesa.kz, saves it for future use, and provides it to the user.

## Features  
- Retrieve Information by ID: Users can request information about a car by sending its ID.
- Parsing and Saving Data: If data on the requested car is not available in the database, the bot parses it from Kolesa.kz, saves it to the database, and then sends it to the user.
- Resource Efficiency: The bot prevents the need for re-parsing data by saving it upon the first request.
## Technologies
- Node.js: For server-side logic.
- MongoDB: For storing car data.
- Telegraf: Framework for creating Telegram bots.
- Axios: For HTTP requests to parse data from Kolesa.kz.
- Cheerio: Used for parsing HTML pages.
