import { Client, ClientOptions, Collection, Colors } from "discord.js";
//import mongoose from "mongoose";
import buildEvents from "../handlers/EventHandler";
import "dotenv/config";
import { Emotes } from "../config";

export default class Amayi extends Client {
    commands: Collection<string, any>
    config: {
        colors: typeof Colors
        emotes: typeof Emotes
    }

    constructor(options: ClientOptions) {
        super(options)

        this.commands = new Collection()
        this.config = {
            colors: Colors,
            emotes: Emotes
        }
        buildEvents(this, "../listeners")
    }

    async login() {
        //Database connection
        /* 
         * const mongoURI = process.env.MONGODB_URI
         * if (!mongoURI) throw new Error("Couldn't connect to database.")
         * await mongoose.connect(mongoURI).then(() => console.log("Connected to MongoDB.")).catch(err => console.error(err))
        */
        return await super.login(process.env.TOKEN);
    }
}