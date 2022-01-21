const cheerio = require('cheerio');
const request = require('request-promise');
const fsi = require('fs-extra');
// const fileStream = fs.createWriteStream('data/quotes.json')
const fs = require("fs");
const path = require("path");

const quotesFilePath = path.join(__dirname, "./data/quotes.json");
const infoQuotes = JSON.parse(fs.readFileSync(quotesFilePath, "utf-8"));

async function action() {
    const $ = await request({
        uri: 'https://quotes.toscrape.com/',
        transform: body => cheerio.load(body)
    })


    $('.quote').each((i, el) => {
        const info = []
        const text = $(el).find('span.text').text().replace(/(^\“|\”$)/g,"");
        const author = $(el).find('span small.author').text();
        const tags = [];
        $(el).find('.tags a.tag').each((i, el) => tags.push($(el).text()));

        const oneQuote = {
            author: author,
            quote: text,
            tags: tags
        }
    
        const exist = infoQuotes.find( x => x.quote === oneQuote.quote);

        if (!exist) {
            const lastId = infoQuotes[infoQuotes.length - 1].id + 1
            console.log(lastId)
            const approved = {
                id: lastId,
                author: oneQuote.author,
                quote: oneQuote.quote,
                tags: oneQuote.tags
            }
            infoQuotes.push(approved);
            const jsonString = JSON.stringify(infoQuotes, null, 4);
            fs.writeFileSync(quotesFilePath, jsonString);
        } if (exist) {
            const existingNote = infoQuotes.find((inf) => {
                return inf.quote == text
            })
                existingNote.author = oneQuote.author,
                existingNote.quote = oneQuote.quote,
                existingNote.tags = oneQuote.tags
            
            const jsonString = JSON.stringify(infoQuotes, null, 4);
            fs.writeFileSync(quotesFilePath, jsonString);
        }
        


    })
}

action()