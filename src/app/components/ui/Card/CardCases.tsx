'use client';

import React from 'react';
import { useTranslation } from "react-i18next";
import { FiArrowUpRight, FiEye } from 'react-icons/fi';
import Image from 'next/image';
import Button from '../Button';

interface CaseData {
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

interface CardCasesProps {
  title: string;
  imageUrl: string;
  result: string;
  technologies: string[];
  siteUrl: string;
  caseUrl?: string;
  className?: string;
  seeCaseButtonClick?: () => void;
  goToWebsiteButtonClick?: () => void;
  caseData?: CaseData;
}

const CardCases: React.FC<CardCasesProps> = ({
  title,
  imageUrl,
  result,
  technologies,
  seeCaseButtonClick,
  goToWebsiteButtonClick,
  className = '',

}) => {
  const { t } = useTranslation();

  return (
    <div className={`
      bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden 
      hover:shadow-xl transition-all duration-300 flex flex-col h-full p-3
      ${className}
    `}>
      <div className="w-full aspect-[3/2] overflow-hidden relative rounded-xl mb-4 bg-gray-100 dark:bg-zinc-700/30 flex items-center justify-center">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-scale-down rounded-xl"
        />
      </div>

      <div className="p-1 flex flex-col flex-1">
        <h3 className="text-lg text-zinc-600 dark:text-white mb-4 border-b-1 border-zinc-200 dark:border-zinc-600 pb-3">
          {title}
        </h3>
        <div className="mb-4">
          <p className="text-xs text-zinc-400 dark:text-zinc-400 mb-1">
            {t("PORTFOLIO.block_titles.result")}
          </p>
          <p className="text-zinc-700 dark:text-zinc-300 text-sm italic">
            {result}
          </p>
        </div>
        <div className="mb-10">
          <p className="text-xs  text-zinc-400 dark:text-zinc-400 mb-2">
            {t("PORTFOLIO.block_titles.technologies")}
          </p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-700/50 text-zinc-500 dark:text-zinc-300 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto items-start gap-3 flex flex-col">
          <Button
            variant="primary"
            size="sm"
            onClick={seeCaseButtonClick}
            className="flex items-center justify-between gap-2 group"
          >
            {t("PORTFOLIO.buttons.view_case")}

            <FiEye className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={goToWebsiteButtonClick}
            className="flex items-center justify-between gap-2 group"
          >
            {t("PORTFOLIO.buttons.go_to_website")}
            <FiArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardCases;