const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/noticias', async (req, res) => {
  try {
    const { data } = await axios.get('https://listindiario.com/el-deporte');
    const $ = cheerio.load(data);
    const articles = [];

    $('.listing-news').slice(0, 3).each((index, element) => {
      const title = $(element).find('h2').text().trim();
      const excerpt = $(element).find('p').text().trim();
      const link = 'https://listindiario.com' + $(element).find('a').attr('href');
      articles.push({ title, excerpt, link });
    });

    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener las noticias');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
