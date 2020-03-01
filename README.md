# PoxMatchMakingScraper

## Introduction
Project that scrapes the entire match making history from one player in a game called Pox Nora
(https://www.poxnora.com/) into a .csv file.
Then it will use a script to read the .csv file to find the amount of times this player
has won, lost, total games played, and win rate(%) against other players.
Scraper uses Puppeteer Libray: https://github.com/GoogleChrome/puppeteer

## Prerequisites
### Download Node.js command prompt: <https://nodejs.org/en/>
### Download npm: <https://www.npmjs.com/get-npm>

## Installing
Run `npm i` in node terminal to download all the dependencies

## Running the tests
* To run either script, use `node <scriptName.js> <playerName>` to run it
    * Double check player name spelling

### To change the opponents in readFile.js
- Edit readFile.js to add or delete opponents from the array.
### License
This project is licensed under the MIT License - see the LICENSE.md file for details
