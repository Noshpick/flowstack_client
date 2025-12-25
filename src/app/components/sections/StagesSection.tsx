'use client'
import { useTranslation } from "react-i18next";
import CardStages from '../ui/Card/CardStages';
import { FiCheckCircle } from 'react-icons/fi';

const stages = [
  {
    icon: FiCheckCircle,
    titleKey: 'STAGES.cards.card_1.title',
    descriptionKey: 'STAGES.cards.card_1.description'
  },
  {
    icon: FiCheckCircle,
    titleKey: 'STAGES.cards.card_2.title',
    descriptionKey: 'STAGES.cards.card_2.description'
  },
  {
    icon: FiCheckCircle,
    titleKey: 'STAGES.cards.card_3.title',
    descriptionKey: 'STAGES.cards.card_3.description'
  },
  {
    icon: FiCheckCircle,
    titleKey: 'STAGES.cards.card_4.title',
    descriptionKey: 'STAGES.cards.card_4.description'
  },
  {
    icon: FiCheckCircle,
    titleKey: 'STAGES.cards.card_5.title',
    descriptionKey: 'STAGES.cards.card_5.description'
  },

];


export default function StagesSection() {
  const { t } = useTranslation();

  return (
    <section className="p-2">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl">
        <div className="container-custom py-10">
          <h2 className="text-zinc-400 text-base">{t('STAGES.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">

            {stages.map((stages, index) => (
              <CardStages
                key={index}
                title={t(stages.titleKey)}
                description={t(stages.descriptionKey)}
                icon={stages.icon}

              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

