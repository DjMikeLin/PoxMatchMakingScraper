const puppeteer = require('puppeteer');
const fs = require('fs-extra');

(async () => {
  	try{
		const browser = await puppeteer.launch({ headless: true });
	   	const page = await browser.newPage();
	  	await page.goto('https://www.poxnora.com/security/login.do');

	  	await page.type("input[name='username']", "emf2", {delay: 100}); 
	  	await page.type("input[name='password']", "7894561230", {delay: 100});

	  	await Promise.all([
	  		page.waitForNavigation(),
	  		page.click("button[type='submit']")
	  	]);

	  	await page.goto("https://www.poxnora.com/users/viewprofile.do?u=ballballer");
	  	await page.click('img[src$="/btn_gamehistory.jpg"]');

	  	await page.waitForSelector('.rowBg1');
	  	const darkRows = await page.$$('.rowBg1');
	  	const greyRows = await page.$$('.rowBg2');//because darkRows come first, don't need to waitForSelector

	  	await fs.writeFile('out.csv', 'Win,Loss,Type,Ranked,Map,Rating,Date,Duration\n');

	  	var combinedRows = new Array();//creates a new javascript Array
	  	for(var i = 0; i < darkRows.length; i++){
	  		combinedRows.push(darkRows[i]);
	  		combinedRows.push(greyRows[i]);
	  	}

	  	let currRowArr = [];
	  	for(const row of combinedRows){
	  		const ps = await row.$$('p');
	  		
	  		for(const p of ps){
	  			const currText = await page.evaluate(p => p.innerText.replace(/\r?\n/g, ''), p);
	  			currRowArr.push(currText);
	  		}
	  		await fs.appendFile('out.csv', `"${currRowArr[0]}","${currRowArr[1]}","${currRowArr[2]}","${currRowArr[3]}","${currRowArr[4]}","${currRowArr[5]}","${currRowArr[6]}","${currRowArr[7]}"\n`);
	  		currRowArr = [];
	  	}

	  	//await page.screenshot({path: 'example.png'});
	  	await browser.close();
		}catch(e){
			console.log("our error", e)
		}
})();