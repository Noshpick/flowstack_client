'use client';

import { useTranslation } from "react-i18next";
import Image from "next/image";
import HeroLightImage from "../../../../public/images/hero/hero-light.svg";
import HeroDarkImage from "../../../../public/images/hero/hero-dark.svg";
import Button from "../ui/Button";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";

export default function HeroSection() {
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };


  return (
    <section className="p-2">
      <div className="bg-white dark:bg-black rounded-3xl overflow-hidden">
        <div className="container-custom py-8 md:py-16">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-5/9 mb-8 md:mb-0 md:pr-8 order-1 md:order-1">
              <h1 className="text-5xl font-bold dark:text-white text-zinc-800 mb-4">
                {t("HERO.title_1")} <span className="bg-gradient-to-r from-green-500 to-blue-300 bg-clip-text text-transparent whitespace-nowrap">{t("HERO.title_2")}</span> <br></br> {t("HERO.title_3")}
              </h1>
              <p className="text-base text-zinc-500 dark:text-zinc-400 mb-6 md:mb-8">
                {t("HERO.description")}
              </p>

              <div className="hidden md:block">
                <div className="bg-zinc-800 p-5 rounded-2xl inline-block md:min-w-[350px]">
                  <p className="text-xl text-zinc-100 mb-4">
                    {t("HERO.card.title_1")}<br></br>{t("HERO.card.title_2")}

                  </p>

                  <div className="flex flex-col gap-3 items-start">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent border-zinc-700 text-white hover:bg-zinc-800"
                      onClick={() => scrollToSection('portfolio')}
                    >
                      {t("HERO.card.button.ourCases")}
                    </Button>

                    <Link href={t("LINKS.support")}>
                      <Button
                        variant="primary"
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {t("HERO.card.button.contactUs")}
                        <FiArrowUpRight className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Изображение - на мобильных будет вторым, на десктопе справа */}
            <div className="w-full md:w-4/9 flex justify-center mb-8 order-2 md:order-2 md:mb-0">
              <div className="relative w-full max-w-md">
                <div className="dark:hidden">
                  <Image
                    src={HeroLightImage}
                    alt={t("HERO.imageAlt") || "Hero illustration"}
                    className="w-full h-auto"
                  />
                </div>

                <div className="hidden dark:block">
                  <Image
                    src={HeroDarkImage}
                    alt={t("HERO.imageAlt") || "Hero illustration"}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            <div className="w-full order-3 md:hidden">
              <div className="bg-zinc-800 p-5 rounded-2xl w-full">
                <p className="text-xl text-zinc-100 mb-8">
                 {t("HERO.card.title_1")}<br />{t("HERO.card.title_2")}
                </p>

                <div className="flex flex-col gap-3 items-start">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-zinc-700 text-white hover:bg-zinc-800 justify-center"
                    onClick={() => scrollToSection('portfolio')}
                  >
                    {t("HERO.card.button.ourCases")}
                  </Button>
                  
                  <Link href={t("LINKS.support")}>
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white justify-center"
                  >
                    {t("HERO.card.button.contactUs")}
                    <FiArrowUpRight className="ml-2" />
                  </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}