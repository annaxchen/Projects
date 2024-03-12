const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

getRandomElement(quotes);

app.get('/api/quotes/random', (req, res) => {
    res.send({ quote: getRandomElement(quotes) });
});

app.get('/api/quotes/', (req, res) => {
    const { person } = req.query;
    if (person != undefined) {
        const quotesByPerson = quotes.filter(quote => quote.person === person);
        res.send({
            quotes: quotesByPerson
        });
    }
    else {
        res.send({
            quotes: quotes
        });
    }
}
);

app.post('/api/quotes', (req, res) => {
    const newQuote = {
        quote: req.query.quote,
        person: req.query.person
    };
    quotes.push(newQuote);
    res.send(newQuote)
});