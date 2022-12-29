import { constants } from "./const.js";
import request from "request";
import chalk from "chalk";

export let API_TOKEN = null;

function print(text) {
    console.log(chalk.green(text));
}

function error(text) {
    console.error(chalk.red(text));
    process.exit();
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

/**
 * promise func that connects to spotify, await this
 */
export async function connectToSpotify() {
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(constants.CLIENT_ID + ':' + constants.CLIENT_SECRET).toString('base64'))
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };
    request.post(authOptions, (fnError, response, body) => {
        if (!fnError && response.statusCode === 200) {
            API_TOKEN = body.access_token;
        } else {
            error(response.statusCode + " -- " + fnError);
        }
    });
    process.stdout.write(chalk.green("Connecting"));
    while (!API_TOKEN) { //IK its bad practice but index looks nice
        process.stdout.write(chalk.green("."));
        await delay(1000);
    }
    process.stdout.write(chalk.green("\nConnected!\n"));
}

export async function getInfo(link) {
    if (API_TOKEN == null) {
        return null;
    }
    const reqOptions = {
        url: link,
        headers: {
            'Authorization': 'Bearer ' + API_TOKEN
        },
        json: true
    };
    request.get(reqOptions, (fnError, response, body) => {
        if (!fnError && response.statusCode === 200) {
            console.log(body);
            return body;
        } else {
            error(response.statusCode + " -- " + fnError);
        }
    });
}