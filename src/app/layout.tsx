import type { Metadata } from "next";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LangSync from "./components/LangSync";
import "../../i18n/i18n";
import "./globals.css";
import Script from "next/script";
const SITE_URL = "https://flowstack.ru/";
const OG_IMAGE = "https://flowstack.ru/FlowStack.jpg";

export const metadata: Metadata = {
  title: {
    default: "FlowStack — цифровые решения и MVP",
    template: "%s | FlowStack",
  },
  description:
    "FlowStack — цифровые решения под ключ: сайты, приложения и боты. Начни создавать свой бизнес с нами!",
  other: {
    "yandex-verification": "85dae682406c5635",
    "google-site-verification": "v90j0xuDW18mnCt8OjSA0zkm6NUp2RKef3WBIkUXoNQ",
  },
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "FlowStack — цифровые решения и MVP",
    description:
      "Хотите запустить продукт быстро? FlowStack поможет сделать MVP: сайт, приложение или бота — от идеи до результата.",
    url: SITE_URL,
    siteName: "FlowStack",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: OG_IMAGE,
        width: 300,
        height: 300,
        alt: "FlowStack — цифровые решения",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "FlowStack — цифровые решения и MVP",
    description:
      "Запускаем сайты, приложения и чат-ботов. Портфолио и контакты — на flowstack.ru",
    images: [OG_IMAGE],
  },
};


const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FlowStack",
  url: SITE_URL,
  logo: OG_IMAGE,
  description:
    "FlowStack — цифровые решения под ключ: разработка сайтов, приложений и ботов. Портфолио проектов и быстрая связь через контакты на сайте.",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["ru"],
      url: `${SITE_URL}#contact`,
    },
  ],
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE_URL,
  name: "FlowStack",
  inLanguage: "ru-RU",
  potentialAction: {
    "@type": "ContactAction",
    target: `${SITE_URL}#contact`,
    name: "Связаться с FlowStack",
  },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Услуги FlowStack",
  itemListElement: [
    {
      "@type": "Service",
      position: 1,
      name: "Разработка сайтов",
      serviceType: "Web Development",
      areaServed: "RU",
      url: `${SITE_URL}#services`,
      provider: { "@type": "Organization", name: "FlowStack", url: SITE_URL },
    },
    {
      "@type": "Service",
      position: 2,
      name: "Разработка чат-ботов",
      serviceType: "Chatbot Development",
      areaServed: "RU",
      url: `${SITE_URL}#services`,
      provider: { "@type": "Organization", name: "FlowStack", url: SITE_URL },
    },
    {
      "@type": "Service",
      position: 3,
      name: "Разработка приложений",
      serviceType: "App Development",
      areaServed: "RU",
      url: `${SITE_URL}#services`,
      provider: { "@type": "Organization", name: "FlowStack", url: SITE_URL },
    },
  ],
};

const portfolioJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Портфолио FlowStack",
  url: `${SITE_URL}#portfolio`,
  isPartOf: SITE_URL,
  inLanguage: "ru-RU",
  about: [
    { "@type": "Thing", name: "Сайты" },
    { "@type": "Thing", name: "Приложения" },
    { "@type": "Thing", name: "Чат-боты" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Сколько стоит создание сайта во FlowStack?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Стоимость зависит от сложности проекта. Для более точной оценки свяжитесь с нами через форму на сайте.",
      },
    },
    {
      "@type": "Question",
      name: "Вы разрабатываете чат-ботов для Telegram и WhatsApp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, наша команда создаёт чат-ботов для Telegram, WhatsApp и других мессенджеров, включая интеграцию с CRM и платёжными системами.",
      },
    },
    {
      "@type": "Question",
      name: "Можно ли у вас заказать MVP под ключ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, FlowStack специализируется на быстром запуске MVP: от идеи и дизайна до рабочего прототипа за несколько недель.",
      },
    },
    {
      "@type": "Question",
      name: "В каких городах вы работаете?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Мы работаем удалённо по всей России и за её пределами. Все услуги доступны онлайн, встречи и презентации можно проводить по видеосвязи.",
      },
    },
    {
      "@type": "Question",
      name: "Есть ли у вас портфолио готовых проектов?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, на сайте представлен раздел «Портфолио» с примерами сайтов, приложений и ботов, которые мы разработали для клиентов.",
      },
    },
  ],
};

const faqSeoJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Где заказать создание сайта в Москве или других городах?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Вы можете заказать создание сайта во FlowStack из любого города. Мы работаем онлайн по всей России, включая Москву, Санкт-Петербург, Владивосток и другие регионы.",
      },
    },
    {
      "@type": "Question",
      name: "Сколько стоит разработка чат-бота для бизнеса?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Стоимость чат-бота зависит от функций. Cложные решения с интеграцией CRM и платежей могут быть от 100 000 ₽. Мы подбираем решение под ваш бизнес.",
      },
    },
    {
      "@type": "Question",
      name: "Какие технологии используются при разработке сайтов и приложений?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Мы используем современные технологии: React, Next.js, Node.js, PostgreSQL, Prisma, а также интеграции с платёжными системами и API. Это позволяет создавать быстрые и масштабируемые решения.",
      },
    },
    {
      "@type": "Question",
      name: "Можно ли у вас заказать лендинг или интернет-магазин?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, FlowStack разрабатывает как одностраничные лендинги, так и полноценные интернет-магазины с каталогом, корзиной и оплатой онлайн.",
      },
    },
    {
      "@type": "Question",
      name: "Что такое MVP и зачем его заказывать у студии?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MVP (минимально жизнеспособный продукт) — это быстрый прототип вашего сервиса. Его стоит заказывать, чтобы проверить идею на рынке без лишних затрат. FlowStack помогает запустить MVP за считанные недели.",
      },
    },
  ],
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSeoJsonLd) }}
        />

        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/104284767"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </head>

      <body className="bg-neutral-100 dark:bg-black">
        <LangSync />
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {
                    if (document.scripts[j].src === r) { return; }
                  }
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],
                  k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=104284767", "ym");

              ym(104284767, "init", {
                  ssr:true,
                  webvisor:true,
                  clickmap:true,
                  ecommerce:"dataLayer",
                  accurateTrackBounce:true,
                  trackLinks:true
              });
            `,
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}