const pupperteer = require("puppeteer");

module.exports = function (app) {
  app.get("/robot/api/test", async (req, res) => {
    res.status(200).json("Api funcionando corretamente 🚀");
  });

  app.get("/robot/megasena/:qtd", async (req, res) => {
    const { qtd } = req.params;
    try {
      const browser = await pupperteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();

      await page.goto("https://loterias.caixa.gov.br/Paginas/Mega-Sena.aspx", {
        waitUntil: "networkidle2",
      });

      await page.waitForSelector(".related-box", { timeout: 60000 });
      var numerosSorteados = [];

      const anterior = "ul.clearfix> li>a";

      // lopp para saber quantos resultados buscar
      for (let index = 0; index < qtd; index++) {
        // seleciona a lista de números de cada sorteio
        const result = await page.evaluate(() => {
          const dezenas = Array.from(
            document
              .querySelector("ul#ulDezenas")
              .querySelectorAll("li.ng-binding")
          ).map((el) => Number(el.innerHTML));

          return dezenas;
        });

        // clica para o sorteio anterior
        await page.click(anterior);

        // aguarda os resultados os nº serem renderizados
        await page.waitForSelector("li.ng-binding");

        // salva os números encontrados
        numerosSorteados.push(result);
      }
      await browser.close();

      res.status(200).json({ qtd: qtd, sorteios: numerosSorteados });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "ops ocorreu um erro" });
    }
  });
};
