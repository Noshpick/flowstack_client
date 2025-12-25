'use client';

import { useTranslation } from "react-i18next";
import CardServices from '../ui/Card/CardServices';
import Button from "../ui/Button";
import { FiCode, FiMessageSquare, FiTrendingUp, FiLayers, FiCpu } from 'react-icons/fi';
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";

export default function ServicesSection() {
  const { t } = useTranslation();

  const services = [
    {
      icon: FiCode,
      titleKey: 'SERVICES.cards.card_1.title',
      buttonKey: 'SERVICES.cards.card_1.button'
    },
    {
      icon: FiMessageSquare,
      titleKey: 'SERVICES.cards.card_2.title',
      buttonKey: 'SERVICES.cards.card_2.button'
    },
    {
      icon: FiTrendingUp,
      titleKey: 'SERVICES.cards.card_3.title',
      buttonKey: 'SERVICES.cards.card_3.button'
    },
    {
      icon: FiLayers,
      titleKey: 'SERVICES.cards.card_4.title',
      buttonKey: 'SERVICES.cards.card_4.button'
    },
    {
      icon: FiCpu,
      titleKey: 'SERVICES.cards.card_5.title',
      buttonKey: 'SERVICES.cards.card_5.button'
    }
  ];

  return (
    <section className="p-2">
      <div className="bg-zinc-800 dark:bg-zinc-900 rounded-3xl">
        <div className="container-custom py-10">
          <h2 className="text-zinc-400 text-base">{t('SERVICES.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {services.map((service, index) => (
              <CardServices
                key={index}
                title={t(service.titleKey)}
                icon={service.icon}
                buttonText={t(service.buttonKey)}
              />
            ))}

            <div className="bg-gradient rounded-2xl p-5 shadow-lg
            hover:shadow-xl transition-all duration-500 min-h-[200px] flex flex-col">
              <div className="flex justify-between items-start mb-4 flex-1">
                <div className="flex-1 mr-4">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {t("SERVICES.cards.card_6.title")}
                  </h3>
                </div>
              </div>

              <div className="mt-auto flex items-center gap-3">
                <Link href={t("LINKS.support")}>
                  <Button
                    variant="dark"
                    size="md"
                    className="flex items-center justify-between gap-2 group"
                  >
                    {t("SERVICES.cards.card_6.button")}
                  </Button>
                </Link>
                <Link href={t("LINKS.support")}>
                  <button className="rounded-full bg-white p-2.5 hover:bg-zinc-900 text-zinc-900 hover:text-white transition-colors duration-500 flex items-center justify-center">
                    <FiArrowUpRight className="w-4 h-4" />
                  </button>
                </Link>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}