'use client';

import React from 'react';
import { useTranslation } from "react-i18next";
import { IconType } from 'react-icons';
import { FiArrowUpRight } from 'react-icons/fi';
import Button from '../Button';
import Link from 'next/link';

interface CardServicesProps {
    title: string;
    icon: IconType | React.ComponentType<{ size?: number; className?: string }>;
    buttonText: string;
    // onButtonClick?: () => void;
    className?: string;
    iconSize?: number;
    iconClassName?: string;
}

const CardServices: React.FC<CardServicesProps> = ({
    title,
    icon: IconComponent,
    buttonText,
    // onButtonClick,
    className = '',
    iconSize = 24,
    iconClassName = 'text-zinc-700 dark:text-zinc-100'
}) => {
      const { t } = useTranslation();
    return (
        <div className={`
      bg-white dark:bg-zinc-800 rounded-2xl p-5 shadow-lg border border-zinc-200 dark:border-none 
      hover:shadow-xl transition-all duration-300 min-h-[200px] flex flex-col
      ${className}
    `}>
            <div className="flex justify-between items-start mb-4 flex-1">
                <div className="flex-1 mr-4">
                    <h3 className="text-xl font-semibold text-zinc-800 dark:text-white mb-3">
                        {title}
                    </h3>

                </div>

                <div className="flex-shrink-0">
                    <IconComponent
                        size={iconSize}
                        className={iconClassName}
                    />
                </div>
            </div>

            <div className="mt-auto">
                <Link href={t("LINKS.support")}>
                    <Button
                        variant="outline"
                        size="md"
                        // onClick={onButtonClick}
                        className="flex items-center justify-between gap-2 group"
                    >
                        <span>{buttonText}</span>
                        <FiArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default CardServices;