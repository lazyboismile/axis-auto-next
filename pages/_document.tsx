import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8"/>
        <meta name="title" content="Axis-Auto"/>
        <meta name="robots" content="index, follow"/>
        <link rel="icon" type="image/png" href="/img/logo/logoWhite.svg" />
        {/** SEO */}
        <meta name="keyword" content={"axis-auto , axis-auto.uz"}/>
        <meta name="description" content={
          "Search thousands of new and used cars for sale or sell on carsales today! Find new car deals and reviews, comparisons &amp; advice on World's #1 for cars. |" +
          "Найдите тысячи новых и подержанных автомобилей на продажу или продайте их на Carsales уже сегодня! Найдите предложения, обзоры, сравнения и советы по новым автомобилям от лучшего в мире автосалона. |" +
          "Sotish uchun minglab yangi va foydalanilgan mashinalarni qidiring yoki bugun avtomobil sotuvlarida soting! Yangi avtomobil bitimlar va sharhlar topish, taqqoslash & amp; avtomobillar bo'yicha dunyodagi №1 maslahat. |" + 
          "수천 대의 신차 및 중고차를 검색하거나 지금 바로 carsales에서 판매하세요! 세계 1위 자동차 판매 사이트에서 신차 특가 상품, 리뷰, 비교, 조언을 찾아보세요."
        } />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
