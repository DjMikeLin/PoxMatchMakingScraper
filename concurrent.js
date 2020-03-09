const execFile = require('child_process').execFile;

let users = ['TheProdigy1', 'davre', 'MikeLin', 'Markus422']

for(user of users){
    execFile('node', ['scrape.js', user], (error, stdout, stderr) => {
        if(error){
            console.error('stderr', stderr);
            throw error;
        }
        console.log('stdout', stdout);
    });
}
