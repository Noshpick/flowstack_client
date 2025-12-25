'use client';


import React from 'react';
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from 'react-icons/fi';
import Button from '../Button';
import Image from 'next/image';

interface TeamMemberCardProps {
  imageUrl: string;
  name: string;
  emoji: string;
  specialty: string;
  description: string;
  technologies: string[];
  onButtonClick?: () => void;
  className?: string;
  buttonText?: string;
  memberId?: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  imageUrl,
  name,
  emoji,
  specialty,
  description,
  technologies,
  onButtonClick,
  className = '',
  buttonText = 'Подробнее',
  // memberId
}) => {

  const { t } = useTranslation();

  return (
    <div className={`
      bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden 
      hover:shadow-xl transition-all duration-300 flex flex-col h-full items-center pt-8
      ${className}
    `}>
      <div className="h-40 w-40 overflow-hidden p-2 relative bg-zinc-100 dark:bg-white/5 rounded-full">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover rounded-full"
        />
      </div>

      <div className="p-5 flex flex-col flex-1 w-full">
        <h3 className="text-xl font-medium text-zinc-800 dark:text-white mb-2 items-center text-center border-b-1 border-zinc-300 pb-4">
          {name}
        </h3>

        <div className="flex items-center mb-4">
          <span className="text-lg mr-2">{emoji}</span>
          <span className="text-zinc-700 dark:text-zinc-400 text-base">
            {specialty}
          </span>
        </div>

        <div className="mb-6">
          <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed italic">
            {description}
          </p>
        </div>

        <div className="mb-10">
          <p className="text-xs text-zinc-400 dark:text-zinc-400 mb-2">
            {t("TEAM.block_titles.technologies")}         
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

        <div className="mt-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={onButtonClick}
            className="flex items-center justify-between gap-2 group"
          >
            <span>{buttonText}</span>
            <FiArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;