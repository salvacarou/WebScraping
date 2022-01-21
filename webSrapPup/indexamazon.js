const puppeteer = require('puppeteer');
const fs = require("fs");
const path = require("path");

const gamesFilePath = path.join(__dirname, "./data.json");
const infoGames = JSON.parse(fs.readFileSync(gamesFilePath, "utf-8"));


(async ()=>{
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.amazon.com');
    // await page.screenshot({ path: './img/amazonImg.jpg' });

    // const search = "ps5 black ops cold war";
    // const search = "shirt";
    // const search = "parlantes marca pirulo bien pequeños sumergibles";
    // const search = "dragon ball cards bird studio";
    const search = "esferas del dragon ball tamaño real";
    

    await page.type('#twotabsearchtextbox', search);

    await page.waitForTimeout(1500);
    await page.click('#nav-search-submit-button'); 
    await page.waitForTimeout(1500);



const arrayLinks = []

const numbers = await page.evaluate(()=>{
    return  document.querySelector('.s-pagination-strip')
})


async function sal() {
const links = []
if (numbers) {
    for  (let p = 0; p < 100; p++) {
    await page.waitForTimeout(1000);
    await page.waitForSelector('.s-pagination-strip')
    const linkss = await page.evaluate(()=>{
        const link = []
        link.push(window.location.href)
        return link
    })
    links.push(linkss[0])

    const able = await page.evaluate(()=>{
        return document.querySelector('span.s-pagination-next')
    })

    if (able == null) {
        await page.waitForSelector('.s-pagination-strip')
        await page.click('.s-pagination-next');
    } else {
        await page.waitForSelector('.s-pagination-strip')
        await page.click('.s-pagination-next');
        // const lasturl = await page.evaluate(()=>{
        //     return (window.location.href)
        // })
        arrayLinks.push(links)
        break
    }   
    }
}    
}

await sal()

        const allLinks = arrayLinks[0]   

        const allGames = []

        async function pages() {
            for (let tab of allLinks) {
                await page.goto(tab);
                await eachProduct()
            }
            // await allGames.push(games)
            console.log(allGames)
            await infoGames.push(search)
            await infoGames.push(allGames)
            const jsonString = JSON.stringify(infoGames, null, 4);
            fs.writeFileSync(gamesFilePath, jsonString);
        }

        async function onePage() {
            await eachProduct()
            // await allGames.push(games)
            console.log(allGames)
            await infoGames.push(search)
            await infoGames.push(allGames)
            const jsonString = JSON.stringify(infoGames, null, 4);
            fs.writeFileSync(gamesFilePath, jsonString);
        }

        
    //   const games = []; 
        
      async function eachProduct() {
        const games = [];

        const enlaces = await page.evaluate(()=>{
        const elements = document.querySelectorAll('[data-component-type="s-search-result"] h2 a')
        const links = [];
        for (let element of elements) {
            links.push(element.href);
        }
        return links
    })

    

    for (let enlace of enlaces) {
        await page.goto(enlace);
        await page.waitForSelector('#productTitle') // Espera a que aparezca esto
        await page.waitForSelector('#title')

            const game = await page.evaluate(()=>{
            const tmp = {};
            const precio2 = document.querySelector('td.a-span12 span') ? document.querySelector('td.a-span12 span').innerText : "Agotado/agotado en ese color"
            const price = document.querySelector('.priceBlockBuyingPriceString') ? document.querySelector('.priceBlockBuyingPriceString').innerText : precio2;
            tmp.price = price.toLowerCase()
            tmp.title = document.querySelector('#title').innerText;
            tmp.url = window.location.href
                 return tmp

        })
        games.push(game);        
    }
    allGames.push(games)
    // return games
}


if (numbers) {
await pages()
} else {
    await onePage()
}

await browser.close();
})()


