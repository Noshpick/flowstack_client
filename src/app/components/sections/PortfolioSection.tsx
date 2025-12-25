'use client';

import { useState } from 'react';
import { useTranslation } from "react-i18next";
import SwiperSlider from '../ui/SwiperSlider';
import CardCase from '../ui/Card/CardCases';
import CaseModal from '../ui/Modal/CaseModal';

interface CaseStudy {
  id: number;
  title: string;
  description: string;
  image: string;
  result: string;
  technologies: string[];
  siteUrl: string;
  caseUrl: string;
  fullDescription: string;
  challenges: string;
  solutions: string[];
  metrics: string[];
  duration: string;
  teamSize: string;
  client: string;
  gallery: string[];
}

export default function PortfolioSection() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  // Получаем данные кейсов из JSON
  const casesData = t("PORTFOLIO.cases", { returnObjects: true }) as CaseStudy[];

  const handleSeeCaseClick = (caseStudy: CaseStudy) => {
    setSelectedCase(caseStudy);
    setIsModalOpen(true);
  };

  const handleWebsiteClick = (url: string) => {
    window.open(url, '_blank');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCase(null);
  };

  return (
    <section className="">
      <SwiperSlider
        title={t("PORTFOLIO.title")}
        subtitle={t("PORTFOLIO.subtitle")}
        slideWidth="!w-[85%] sm:!w-[70%] md:!w-45%]"
      >
        {casesData.map((caseStudy) => (
          <div key={caseStudy.id} className="h-full">
            <CardCase
              title={caseStudy.title}
              imageUrl={caseStudy.image}
              result={caseStudy.result}
              technologies={caseStudy.technologies}
              siteUrl={caseStudy.siteUrl}
              caseUrl={caseStudy.caseUrl}
              seeCaseButtonClick={() => handleSeeCaseClick(caseStudy)}
              goToWebsiteButtonClick={() => handleWebsiteClick(caseStudy.siteUrl)}
              className="h-full"
              caseData={caseStudy}
            />
          </div>
        ))}
      </SwiperSlider>

      {selectedCase && (
        <CaseModal
          isOpen={isModalOpen}
          onClose={closeModal}
          caseStudy={selectedCase}
        />
      )}
    </section>
  );
}