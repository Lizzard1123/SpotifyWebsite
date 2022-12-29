import { connectToSpotify, getInfo } from "./jsHelpers/spotifyInterface.js";
import chalk from "chalk";

function print(text) {
    console.log(chalk.blueBright(text));
}

function error(text) {
    console.error(chalk.red(text));
}

await connectToSpotify();

const link = "https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V";

getInfo(link);