'use strict'

const fs = require('fs');

const csvJSON = (csv) => {

    let lines = csv.split('\n');
    let result = [];
    let indexes = [0,1,2,3,6,14,17];
    let headers = lines.shift().split(',');

    lines.forEach(line => {
        let obj = {}
        let current = line.split(',');
        
        current.forEach((block, index) => {
            if(indexes.includes(index))
                obj[headers[index]] = block;
        });

        result.push(obj)
    });

    return result;
}

const to_read = () => {
    return csvJSON(fs.readFileSync('./data.csv', 'utf8'));
}

const data = to_read()


//Quantas nacionalidades (coluna `nationality`) diferentes existem no arquivo? 
const q1 = () => {

    const myData = data;

    let countries = [];

    myData.forEach(player => {
        if(player && player['nationality'])
            countries.push(player['nationality']);
    });

    let unique = [...new Set(countries)];

    return unique.length;

}

//Quantos clubes (coluna `club`) diferentes existem no arquivo?

const q2 = () => {

    const myData = data;

    let clubs = [];

    myData.forEach(player => {
        if(player && player['club'])
            clubs.push(player['club']);
    });

    let unique = [...new Set(clubs)];

    return unique.length;
}

//Liste o primeiro nome dos 20 primeiros jogadores de acordo com a coluna `full_name`.

const q3 = () => {

    const myData = data;

    let result = [];

    for(let interator = 0; interator < 20; interator++)
        result.push(myData[interator].full_name);

    return result;

}

//Quem são os top 10 jogadores que ganham mais dinheiro (utilize as colunas `full_name` e `eur_wage`)?

const q4 = () => {

    const mydata = data;

    let result = [];

    mydata.sort((a, b) => {

        if (+a.eur_wage > +b.eur_wage) return -1;

        if (+b.eur_wage > +a.eur_wage) return 1;

        if (a.full_name < b.full_name) return -1;

        if (b.full_name < a.full_name) return 1;

        return 0;

    });

    for (let interator = 0; result.length < 10; interator++)

        if(mydata[interator] && mydata[interator].full_name)

            result.push(mydata[interator].full_name);

    return result;

}


//Quem são os 10 jogadores mais velhos (use como critério de desempate o campo `eur_wage`)?

const q5 = () => {

    const mydata = data;

    let result = [];

    mydata.sort((a, b) => {

        if (+a.age > +b.age) return -1;

        if (+b.age > +a.age) return 1;

        if (+a.eur_wage > +b.eur_wage) return -1;

        if (+b.eur_wage > +a.eur_wage) return 1;

        return 0;

    });

    for (let interator = 0; result.length < 10; interator++)

        if(mydata[interator] && mydata[interator].full_name)

            result.push(mydata[interator].full_name);

    return result;

}


//Conte quantos jogadores existem por idade. Para isso, construa um mapa onde as chaves são as idades e os valores a contagem.

const q6 = () => {

    const mydata = data;

    return mydata.reduce((obj, player)=>{

        if(player && player['age'])

        {

            if(!obj[player['age']])

                obj[player['age']] = 0;

            obj[player['age']]++;

        }

        return obj;

    },{});

}

module.exports = { q1, q2, q3, q4, q5, q6 }