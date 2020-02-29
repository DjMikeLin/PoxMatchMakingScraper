const puppeteer = require('puppeteer');
const fs = require('fs-extra');

(async () => {
  	try{
	  	const extractAll = async url => {
	  		console.log(url);
	  		await page.goto(url);//Current page

		  	const darkRows = await page.$$('.rowBg1');
		  	const greyRows = await page.$$('.rowBg2');//because darkRows come first, don't need to waitForSelector

		  	var combinedRows = new Array();//combines grayRows and darkRows to where rows alternate
		  	for(var i = 0; i < darkRows.length; i++){
		  		combinedRows.push(darkRows[i]);
		  		combinedRows.push(greyRows[i]);
		  	}

		  	let currRowArr = [];
		  	for(const row of combinedRows){
		  		if(row === undefined)//base case for recursion if a row is undefined
	  				return;

		  		const ps = await row.$$('p');//grabs all the paragraph tags in this row
		  		for(const p of ps){//finds the innerText of the paragraph and adds it to currRowArr
		  			const currText = await page.evaluate(p => p.innerText.replace(/\r?\n/g, ''), p);
		  			currRowArr.push(currText);
		  		}
		  		//adds contents to out.csv. currRowArr can only be length 8.
		  		await fs.appendFile('out.csv', `"${currRowArr[0]}","${currRowArr[1]}","${currRowArr[2]}","${currRowArr[3]}","${currRowArr[4]}","${currRowArr[5]}","${currRowArr[6]}","${currRowArr[7]}"\n`);
		  		currRowArr = [];//resets array;
		  	}
		  	//Checks if darkRows or greyRows don't equal 10. If either is true base case is reached
		  	if(darkRows.length !== 10 || greyRows.length !== 10)
		  		return;
		  	else{//if base case is not reached go to next page in match history
			  	const nextPageNumber = parseInt(url.match(/&fb=&p=(\d+)&fb=$/)[1], 10) + 1;
		  		const nextUrl = `https://www.poxnora.com/account/matchhistory.do?&i=1530499&fb=&p=${nextPageNumber}&fb=`;
				return await extractAll(nextUrl);
	  		}
	  	};
	  	//set headers
	  	await fs.writeFile('out.csv', 'Win,Loss,Type,Ranked,Map,Rating,Date,Duration\n');
		const browser = await puppeteer.launch({ headless: false });
	   	const page = await browser.newPage();
	  	//To view match history, it requires login and a submit button click
	  	await page.goto('https://www.poxnora.com/security/login.do');
	  	await page.type("input[name='username']", "emf2", {delay: 100}); 
	  	await page.type("input[name='password']", "7894561230", {delay: 100});

	  	await Promise.all([
	  		page.waitForNavigation(),
	  		page.click("button[type='submit']")
	  	]);

        let test = 'ballballer'
        await page.goto(`https://www.poxnora.com/users/viewprofile.do?u=${test}`);

	  	await Promise.all([
	  		page.waitForNavigation(),
	  		page.click("img[src='/_themes/global/btn_gamehistory.jpg']")
	  	]);

        let userId = page.url().match(/i=(\d+)&fb=/)[1];
	  	//Initial call of the recursive function with initial url at page 0
	  	await extractAll(`https://www.poxnora.com/account/matchhistory.do?&i=${userId}&fb=&p=0&fb=`);

	  	//await page.screenshot({path: 'example.png'});
	  	await browser.close();
		}catch(e){
			console.log("our error", e)
		}
})();
