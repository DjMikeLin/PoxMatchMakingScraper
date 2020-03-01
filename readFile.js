const csv = require('csv-parser');
const fs = require('fs-extra');
const date = require('./date');
const results = [];

try{//array of opponents
	const opponents = ['TinyDragon', 'ballballer', 'DevilsRath', 'Ryvirath', 'hashinshin', 'Kithros', 'theRed', 'sinwind', 'Soremist', 'DragonSlayer1',
	'TheNidhogg', 'kthx', 'Hermaios', 'BurnPyro', 'Dagdapede', 'calisk', 'Taylor', 'MogaBait', 'xaznsoulx', 'Gainer900',
	'MW24', 'Zorbot', 'Sheepy23', 'Nihilarian', 'Luvadata', 'Indijanac', 'DMrBadguy', 'Markoth', 'Halfgodx', 'Revenancer',
	'guitarape', 'Axeraiser', 'movntarget', 'RasielCZ', 'iPox', 'MarkXXIV', 'ShrineMaster', 'XIThorXI', 'Nepallyon', 'TheProdigy1',
	'Soulfear', 'CorpsE', 'diablozIII', 'PooiPants', 'Leviathan', 'XConboyX', 'Badgerale', 'Yobanchi', 'Kernok', 'Strings', 'Truce',
	'TheRavager', 'molecl', 'heroex77', 'magnusgrey', 'agirgis1', 'Caine', 'destorum', 'davre', 'Alexispfp', 'inklew', 'Krebmart',
	'DirtyLimey', 'Drumaster', 'Thurwell', 'Dany90', 'Baskitkase', 'Lepakko', 'Claude', 'Iajabmaka', 'mmrv', 'NoraThat', 'Cydna',
	'Shazaraaaa', 'Neil', 'Junithorn', 'WarFooT', 'nebron', 'Konung79', 'Alakhami', 'karmavore', 'krezio', 'Seifer18', 'HellspawnD'];
	
    if(process.argv.length != 3){
        throw new Error("Only one argument(user name) can be passed to this script!");
    }

    let user = process.argv[2];	

    fs.createReadStream(`${user}${date.getCurrDate()}.csv`)//Specific .csv file to read
	  .pipe(csv())
	  .on('data', (data) => results.push(data))
	  .on('end', () => {
	    for(var opponent of opponents){
    		var x = 0;//Player Wins
			var y = 0;//Player Losses
		    for(var row of results){//loops through all the results
		    	if(row.Type === '1v1' && row.Ranked === 'Yes' && (row.Win === opponent || row.Loss === opponent))
		    		if(row.Win === opponent)
		    			y++;
		    		else 
		    			x++;
			}
			const totalGames = x + y;
			const winRate = (x/totalGames) * 100;
			console.log(opponent + ':', x, y, totalGames, winRate);
	  	}
	});
}catch(e){
	console.log('our error', e);
}
