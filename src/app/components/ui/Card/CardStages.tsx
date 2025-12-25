'use client';

import React from 'react';
import { IconType } from 'react-icons';

interface CardStagesProps {
    title: string;
    description: string;
    icon: IconType | React.ComponentType<{ size?: number; className?: string }>;
    className?: string;
    iconSize?: number;
    iconClassName?: string;
}

const CardStages: React.FC<CardStagesProps> = ({
    title,
    description,
    icon: IconComponent,
    className = '',
    iconSize = 28,
    iconClassName = 'text-zinc-700 dark:text-zinc-100'
}) => {
    return (
        <div className={`
      bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-5 border border-zinc-200 dark:border-none hover:shadow-lg
      hover:shadow-lg transition-all duration-300 flex flex-col min-h-[200px]
      ${className}
    `}>
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1 mr-4">
                    <h3 className="text-xl font-semibold text-zinc-800 dark:text-white mb-0">
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

            <div className="flex-1">
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default CardStages;