const fs = require("fs");
const request = require("request");

function question1() {
    console.log("=============================== QUESTION 1 ================================");
    let num = 1000000;
    console.log((num * (num + 1)) / 2);
}

async function question2part1() {
    console.log("=============================== QUESTION 1 ================================");
    console.log("======= QUESTION 2 PART 1=======");

    var randomizedPeopleDataset = await JSON.parse(
        fs.readFileSync("./files/dataset.json", "utf8")
    );
    
    for (let i = 0; i < randomizedPeopleDataset.length; i++) {

        request.get( `http://api.openweathermap.org/data/2.5/weather?q=${randomizedPeopleDataset[i].City},${randomizedPeopleDataset[i].CountryOfBirth}&APPID=66158f0d119d59fa37656393bcc451db`,
            function(error, response, body) {
            if (error) throw new Error(error);

            let data = JSON.parse(body);
            console.log(
                `CURRENT WEATHER OF (${randomizedPeopleDataset[i].City}, ${randomizedPeopleDataset[i].CountryOfBirth}) => ` +
                data.weather[0].description
            );
            }
        );
    }
}

async function question2part2() {
    console.log("");
    console.log("======= QUESTION 2 PART 2=======");

    var randomizedPeopleDataset = await JSON.parse(
        fs.readFileSync("./files/dataset.json", "utf8")
    );

    for (let i = 0; i < randomizedPeopleDataset.length; i++) {

        request.get(`https://api.exchangeratesapi.io/latest`, function(error, response, body) {
            if (error) throw new Error(error);

            let data = JSON.parse(body);
            let currency = randomizedPeopleDataset[i].Currency;
            let ex_rate = data.rates[currency];
            let income = Number(randomizedPeopleDataset[i].GrossAnnualIncome);

            let euros = income / ex_rate;

            let onweekbasis = Number(euros / 4);

            if (currency == 'EUR') {
                console.log(`EURO CONVERSION : ${income} (${currency}) => ${income} (EUR)`);
                console.log(`INCOME ON WEEKLY BASIS IN EUROS : ${income / 4}`);
                console.log(``);
            } else if (Number.isNaN(euros)) {
                console.log(`EURO CONVERSION : ${income} (${currency}) => Not Avaialble!`);
                console.log(`INCOME ON WEEKLY BASIS IN EUROS : Not Avaialble!`);
                console.log(``);
            } else {
                console.log(`EURO CONVERSION : ${income} (${currency}) => ${euros} (EUR)`);
                console.log(`INCOME ON WEEKLY BASIS IN EUROS : ${onweekbasis}`);
                console.log(``);
            }
        });
    }
}

function test ()  {
    setTimeout(() => {
        question1()
        setTimeout(() => {
            question2part1();
            setTimeout(() => {
                question2part2()
            }, 4000);
        }, 4000);
    }, 1000);
}

test();