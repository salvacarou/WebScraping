const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs-extra');
const fileStream = fs.createWriteStream('quotes.csv')

async function action() {
    const $ = await request({
        uri: 'https://quotes.toscrape.com/',
        transform: body => cheerio.load(body)
    });
    const title = $('title');
    // console.log(title.html());

    const heading = $('h1');
    // console.log(heading.text().trim());

     const bigquotes = $('.quote'); // Asi solo me devuelve la primera cita y todo lo que trae
    // console.log(bigquotes.html());

    const quotes = $('.quote').find('a'); // esto busca el a de la cita
    // console.log(quotes.html())  

    const thirdQuote = $('.quote').next().next(); // esta da la tercera cita
    // console.log(thirdQuote.html()) 

    const containerClass = $('.row .col-md-8').parent().next(); // un div adentro de otro
    // console.log(containerClass.html())

    const spanText1 = $('.quote span.text') // La primera cita que encuentra (muchos divs cumplen con esa regla)
    // console.log(spanText1.html())

    const spanText = $('.quote span.text').each((i, el) => {  // Todas las citas
        // console.log(i, $(el).text())
        const quote_text = $(el).text().replace(/(^\“|\”$)/g,"") // uso de expresiones regulares de js, (^ para indicar que esta al inicio, \ para indicar al final)
        // console.log(i, quote_text)
        
    })

    fileStream.write('Quote|Author|Tags\n');
    $('.quote').each((i, el) => {
        // console.log(i, $(el).html())
        const text = $(el).find('span.text').text().replace(/(^\“|\”$)/g,"");
        const author = $(el).find('span small.author').text();
        const tags = [];
        $(el).find('.tags a.tag').each((i, el) => tags.push($(el).text()));
        console.log(i, text, author, tags)
        fileStream.write(`${text}|${author}|${tags}\n`);
    })
    
}

action()

