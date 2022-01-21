const puppeteer = require('puppeteer');
const fs = require("fs");
const path = require("path");

const jsonFilePath = path.join(__dirname, "./data2.json");
const jsonInfo = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

(async ()=>{
    jsonInfo.length = 0 // Borrando la informacion vieja
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({
        width: 800,
        height: 800
    })

    await page.goto('https://www.drmartens.com/ar/es_ar/');
    await page.waitForSelector('#popup-subcription-backgrounds-container-e0b5751e-386a-4481-80fc-4e4c4aeee818'); // para sacar los popups
    await page.click('.dm-logo');
    await page.waitForTimeout(150);
    await page.click('.dm-logo'); 
    
    await page.setViewport({
        width: 1200,
        height: 800
    })
    
async function grabado(){

    const cateLinks = await getLinks('ul.dm-primary-nav li.nav__links--primary span.yCmsComponent a')

    for (let clink of cateLinks) { // recorro cada link de categoria para buscar los links de los productos
     await page.goto(clink.url);
    const prodLinks = await getLinks('a.product__list__item__name')

     for (let link of prodLinks) {
         await page.goto(link.url)
         await page.waitForSelector('h1.product-main-info__name');
         const seeMore = await page.$('a.morelink')
         if (seeMore) {
             await page.click('a.morelink');
         }
         const info = await page.evaluate((clink, link, jsonInfo)=>{
            const price = 'span.bfx-price'
            const description = 'div.product-desc-tab-content'
            const img = 'div.image div.pdpContent-productImagesEach picture img.img-responsive'

             const obj = {};
             obj.id = jsonInfo.length + 1;
             obj.name = link.name;
             obj.price = document.querySelector(price).innerText;
             obj.description = document.querySelector(description).innerText;
             obj.img = document.querySelector(img).getAttribute('src');
             obj.categoryLinkName = clink.name;
             obj.url = window.location.href;
             
             return obj
         }, clink, link, jsonInfo)
        jsonInfo.push(info)
     }
    }
    jsonInfo.unshift(cateLinks)   
    const jsonString = JSON.stringify(jsonInfo, null, 4);
    fs.writeFileSync(jsonFilePath, jsonString);
}

await grabado()
    


// -----------------
// Services 

// Devuelve todos los links y nombres que encuentre del selector
// Tiene que ser usado sobre un texto con un link
// Usado para las categorias y para los productos de cada categoria
async function getLinks(selector) {
    await page.waitForSelector(selector);
    const link = await page.evaluate((selector) => {
        const links = [];
        const elements = document.querySelectorAll(selector);
        for (let element of elements) {
            obj = {};
            obj.name = element.innerText
            obj.url = element.href
            links.push(obj)
        }
    return links
    }, selector)
    return link
}

await browser.close();

})()

