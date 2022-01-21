**Proyecto de web scraping**

-------------------------------------------

***webScrapPup***

Usando puppeteer (me desarrollo mejor)

indexamazon.js: 
- Extraccion de datos de una busqueda de amazon. Poner lo que queres que busque en el buscador, y selecciona todos los productos de todas las tabs que contenga el producto.
- Hecho para probar
- Cada tanto pregunta si soy un bot
- Video de guia: "https://www.youtube.com/watch?v=GPktgPJE4VU&t=558s&ab_channel=10MinutosProgramando"
- La informacion la guarda en data.json

index.js:
- Extraccion de todos los productos de la pagina ('https://www.drmartens.com/ar/es_ar/').
- Mas ordenado y practico.
- Extrae: los links de las categorias, y del producto: le crea un id, nombre, precio, descripcion, nombre de la categoria y url del producto
- La informacion la guarda en data2.json

***WebScrapCheerio***

Usando cheerio (no lo use tanto)

Pagina usada (hecha para practicar web scrapping)
url = https://quotes.toscrape.com/

index.js:
Extrae la informacion de las citas de la pagina y las guarda en un archivo .json.
Si la cita ya existe en el json no la agrega.
Si la cita ya existe pero tiene otros datos diferentes se modifican.

Video tutorial usado: https://www.youtube.com/watch?v=dJpSTPUVKQU&ab_channel=FaztCode
El video se probo en indexPruebas.js

