const yargs = require('yargs');

// Creat add command
yargs.command({
    command: 'add',
    describe: 'add is defined as the result we get on adding two numbers',
    builder: {
        x: {
            describe: 'First Number',
            demandOption: true,
            type: 'number',
        },
        y: {
            describe: 'Second Number',
            demandOption: true,
            type: 'number',
        },
    },
    handler: function(argv) {
        console.log(`The result of ${argv.x} + ${argv.y} is ${argv.x + argv.y}`);
    }
});


// Creat sub command
yargs.command({
    command: 'sub',
    describe: 'sub is defined as the result we get on subtraction of two numbers',
    builder: {
        x: {
            describe: 'First Number',
            demandOption: true,
            type: 'number',
        },
        y: {
            describe: 'Second Number',
            demandOption: true,
            type: 'number',
        },
    },
    handler: function(argv) {
        console.log(`The result of ${argv.x} - ${argv.y} is ${argv.x - argv.y}`);
    }
});


yargs.command({
    command: 'mult',
    describe: 'mult is defined as the result we get on multiplication of two numbers',
    builder: {
        x: {
            describe: 'First Number',
            demandOption: true,
            type: 'number',
        },
        y: {
            describe: 'Second Number',
            demandOption: true,
            type: 'number',
        },
    },
    handler: function(argv) {
        console.log(`The result of ${argv.x} * ${argv.y} is ${argv.x * argv.y}`);
    }
});

yargs.command({
    command: 'pow',
    describe: 'pow is defined as the result we get on squering some number',
    builder: {
        x: {
            describe: 'First Number',
            demandOption: true,
            type: 'number',
        },
    },
    handler: function(argv) {
        console.log(`The result of ${argv.x} ^ 2 is ${argv.x * argv.x}`);
    }
});

/*
// Without any command
const argv = yargs(process.argv.slice(2)).argv;
console.log(argv)
*/



yargs.parse();