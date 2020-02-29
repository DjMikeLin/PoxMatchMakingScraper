# PoxMatchMakingScraper

## Introduction
Project that scrapes the entire match making history from one player in a game called Pox Nora
(https://www.poxnora.com/) into a .csv file.
Then it will use a script to read the .csv file to find the amount of times this player
has won, lost, total games played, and win rate(%) against other players.
Scraper uses Puppeteer Libray: https://github.com/GoogleChrome/puppeteer

## Prerequisites
### Download Node.js command prompt: https://nodejs.org/en/

## Installing
Run `npm i` in node terminal to download all the dependencies

## Running the tests
* To run either script, simply type `node scriptName` to run it
* To change the default player to scrape in scrape.js
* Navigate to that player's Match History
	- Login at https://www.poxnora.com/security/login.do
	- Hover mouse over Rankings and find a player through clicking on Solo Leaderboard or Search for Player
		Or:
	- Use this link to jump to a player's profile. https://www.poxnora.com/users/viewprofile.do?u=PLAYERNAME
		- ex: https://www.poxnora.com/users/viewprofile.do?u=ballballer
	- Click on Game History
	- In the player's match history url, find the number after i= and copy it.
	- At the line `await extractAll("url");` delete the previous players id found after i= and
		replace it with the new players id
		ex: https://www.poxnora.com/account/matchhistory.do?&i=966018&fb=&p=0&fb=
		This player's id comes after i= and it is 966018
		Delete old i= and replace it with the new number
	- Do the same as the previous instruction for the line 
	`const nextUrl = `https://www.poxnora.com/account/matchhistory.do?&i=1530499&fb=&p=${nextPageNumber}&fb=`;`
### To change the opponents in readFile.js
- Follow simple Java Script array formatting to add or delete opponents from the array.
### License
This project is licensed under the MIT License - see the LICENSE.md file for details
