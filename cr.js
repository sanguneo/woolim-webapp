import puppeteer from 'puppeteer';
import { load } from 'cheerio';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getRes = (browser) => async (url, keyword) => {
  const page = await browser.newPage();
  await page.goto(url);
  await delay(300);
  const html = await page.content();
  const $ = load(html);

  const array = [];
  // 검색 결과를 파싱합니다.
  $('#app-root > div > div ul > li').each((index, element) => {
    const title = $(element).find('.place_bluelink > span:first-child').text();
    const isAd = $(element).attr('class').split(' ').length > 1;
    if (title && !isAd) {
      array.push(title);
    }
  });
  const rank = array.findIndex(i => i.includes('토니앤가이')) + 1;
  return [keyword, { rank, list: array.slice(0, Math.ceil(rank / 10) * 10) }];
};

export async function searchAndScrape() {
  const browser = await puppeteer.launch();
  let res = [];
  try {
    const func = getRes(browser);
    res = await Promise.all([
      func('https://m.place.naver.com/hairshop/list?ac=0&debug=0&ngn_country=KR&nlu_query=%7B%22qr%22%3A%5B%7B%22query%22%3A%22%EC%8B%A0%EB%8F%84%EB%A6%BC%20%ED%97%A4%EC%96%B4%20%EC%83%B5%22%2C%22c_score_org%22%3A0.280626%2C%22c_score%22%3A0.280626%2C%22score%22%3A-0.94136%2C%22qr_category%22%3A2%2C%22qr_type%22%3A42%7D%2C%7B%22query%22%3A%22%EC%8B%A0%EB%8F%84%EB%A6%BC%20%ED%97%A4%EC%96%B4%22%2C%22c_score_org%22%3A0.235339%2C%22c_score%22%3A0.235339%2C%22score%22%3A-1.178407%2C%22qr_category%22%3A7%2C%22qr_type%22%3A36%7D%2C%7B%22query%22%3A%22%EC%8B%A0%EB%8F%84%EB%A6%BC%22%2C%22c_score%22%3A-0.084%2C%22c_score_org%22%3A-0.084%2C%22score%22%3A-2.605%2C%22qr_category%22%3A4%2C%22qr_type%22%3A31%7D%5D%2C%22hairshop%22%3A%7B%22spot%22%3A%22%EC%8B%A0%EB%8F%84%EB%A6%BC%22%2C%22type%22%3A%22%EB%AF%B8%EC%9A%A9%EC%8B%A4%22%2C%22q%22%3A%22%EC%8B%A0%EB%8F%84%EB%A6%BC%EB%AF%B8%EC%9A%A9%EC%8B%A4%22%7D%2C%22nluQuery%22%3A%22%EC%8B%A0%EB%8F%84%EB%A6%BC%EB%AF%B8%EC%9A%A9%EC%8B%A4%22%7D&nqx_theme=%7B%22theme%22%3A%7B%22main%22%3A%7B%22name%22%3A%22hairshop_list%22%7D%2C%22sub%22%3A%5B%7B%22name%22%3A%22location%22%7D%5D%7D%7D&nscs=0&query=%EC%8B%A0%EB%8F%84%EB%A6%BC%EB%AF%B8%EC%9A%A9%EC%8B%A4&rev=37&sm=mtp_hty.top&spq=0&ssc=tab.m.all&where=m&deviceType=mobile&target=mobile&x=126.9783882&y=37.5666103&originalQuery=%EC%8B%A0%EB%8F%84%EB%A6%BC%EB%AF%B8%EC%9A%A9%EC%8B%A4&level=top&entry=pll', '신도림미용실'),
      func('https://m.place.naver.com/hairshop/list?ac=0&debug=0&ngn_country=KR&nlu_query=%7B%22qr%22%3A%5B%7B%22query%22%3A%22%EA%B5%AC%EB%A1%9C%20%EC%97%AD%20%ED%97%A4%EC%96%B4%20%EC%83%B5%22%2C%22c_score_org%22%3A0.810771%2C%22c_score%22%3A0.810771%2C%22score%22%3A1.45503%2C%22qr_category%22%3A2%2C%22qr_type%22%3A42%7D%2C%7B%22query%22%3A%22%EA%B5%AC%EB%A1%9C%20%EC%97%AD%20%ED%97%A4%EC%96%B4%22%2C%22c_score_org%22%3A0.189489%2C%22c_score%22%3A0.189489%2C%22score%22%3A-1.453335%2C%22qr_category%22%3A7%2C%22qr_type%22%3A36%7D%2C%7B%22query%22%3A%22%EA%B5%AC%EB%A1%9C%20%EB%AF%B8%EC%9A%A9%EC%8B%A4%22%2C%22c_score%22%3A-0.002%2C%22c_score_org%22%3A-0.002%2C%22score%22%3A-3.071%2C%22qr_category%22%3A4%2C%22qr_type%22%3A31%7D%5D%2C%22hairshop%22%3A%7B%22spot%22%3A%22%EA%B5%AC%EB%A1%9C%EC%97%AD%22%2C%22type%22%3A%22%EB%AF%B8%EC%9A%A9%EC%8B%A4%22%2C%22q%22%3A%22%EA%B5%AC%EB%A1%9C%EC%97%AD%20%EB%AF%B8%EC%9A%A9%EC%8B%A4%22%7D%2C%22nluQuery%22%3A%22%EA%B5%AC%EB%A1%9C%EC%97%AD%20%EB%AF%B8%EC%9A%A9%EC%8B%A4%22%7D&nqx_theme=%7B%22theme%22%3A%7B%22main%22%3A%7B%22name%22%3A%22hairshop_list%22%7D%7D%7D&nscs=0&query=%EA%B5%AC%EB%A1%9C%EC%97%AD%EB%AF%B8%EC%9A%A9%EC%8B%A4&rev=37&sm=mtb_hty.top&spq=0&ssc=tab.m.all&where=m&deviceType=mobile&target=mobile&x=126.9783882&y=37.5666103&originalQuery=%EA%B5%AC%EB%A1%9C%EC%97%AD%20%EB%AF%B8%EC%9A%A9%EC%8B%A4&level=top&entry=pll', '구로역미용실'),
      ]);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
  return res;
}
