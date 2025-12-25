'use client';

import React, { useEffect } from 'react';
import { FiX, FiChevronLeft, FiChevronRight, FiExternalLink, FiGithub, FiLinkedin, FiMessageCircle } from 'react-icons/fi';
import Image from 'next/image';
import { useTranslation } from "react-i18next";

// import Button from '../Button';

interface SocialLinks {
  linkedin?: string;
  github?: string;
  telegram?: string;
  portfolio?: string;
  behance?: string;
  dribbble?: string;
}

interface TeamMember {
  id: number;
  imageUrl: string;
  name: string;
  emoji: string;
  specialty: string;
  description: string;
  technologies: string[];
  buttonText: string;
  bio: string;
  experience: string;
  projects: string;
  creates: string;
  socials: SocialLinks;
  skills: string[];
}

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: TeamMember[];
  initialIndex: number;
}

const TeamModal: React.FC<TeamModalProps> = ({ isOpen, onClose, members, initialIndex }) => {

  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentIndex(initialIndex);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialIndex]);

    useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
  if (!isOpen) {

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
}, [isOpen]);

  const nextMember = () => {
    setCurrentIndex((prev) => (prev + 1) % members.length);
  };

  const prevMember = () => {
    setCurrentIndex((prev) => (prev - 1 + members.length) % members.length);
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  const currentMember = members[currentIndex];

  const SocialIcon = ({ platform, url }: { platform: keyof SocialLinks; url?: string }) => {
    if (!url) return null;

    const icons = {
      linkedin: <FiLinkedin className="w-5 h-5" />,
      github: <FiGithub className="w-5 h-5" />,
      telegram: <FiMessageCircle className="w-5 h-5" />,
      portfolio: <FiExternalLink className="w-5 h-5" />,
      behance: <FiExternalLink className="w-5 h-5" />,
      dribbble: <FiExternalLink className="w-5 h-5" />
    };

    return (
      <button
        onClick={() => handleSocialClick(url)}
        className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        title={platform}
      >
        {icons[platform]}
      </button>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative bg-white dark:bg-zinc-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 z-10 p-2 rounded-full bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow"
        >
          <FiX className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
        </button>

        {/* Navigation arrows */}
        {members.length > 1 && (
          <>
            <button
              onClick={prevMember}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow"
            >
              <FiChevronLeft className="cursor-pointer w-6 h-6 text-zinc-600 dark:text-zinc-400" />
            </button>
            <button
              onClick={nextMember}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow"
            >
              <FiChevronRight className="cursor-pointer w-6 h-6 text-zinc-600 dark:text-zinc-400" />
            </button>
          </>
        )}

        {/* Content */}
        <div className="overflow-y-auto max-h-[90vh] p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column - Profile */}
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 md:w-56 md:h-56 relative mb-6">
                <Image
                  src={currentMember.imageUrl}
                  alt={currentMember.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-white mb-2 text-center">
                {currentMember.name}
              </h2>

              <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">{currentMember.emoji}</span>
                <span className="text-lg text-zinc-600 dark:text-zinc-400">
                  {currentMember.specialty}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6 w-full">
                <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg text-center">
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Опыт</div>
                  <div className="font-semibold text-zinc-800 dark:text-white">{currentMember.experience}</div>
                </div>
                <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg text-center">
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Проекты</div>
                  <div className="font-semibold text-zinc-800 dark:text-white">{currentMember.projects}</div>
                </div>
              </div>


              {/* Technologies */}
              <div className="w-full">
                <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3 text-center">
                  {t("TEAM.block_titles.technologies")}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {currentMember.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column - Detailed info */}
            <div className="flex flex-col space-y-6">
              {/* Bio */}
              <div>
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-3">
                  {t("TEAM.block_titles.bio")}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {currentMember.bio}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-3">
                  {t("TEAM.block_titles.creates")}

                </h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  {currentMember.creates}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-3">
                  {t("TEAM.block_titles.skills")}
                </h3>
                <ul className="space-y-2">
                  {currentMember.skills.map((skill, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-green-700 rounded-full mr-3"></span>
                      <span className="text-zinc-600 dark:text-zinc-300">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {members.length > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                {members.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentIndex
                      ? 'bg-zinc-800 dark:bg-white w-4'
                      : 'bg-zinc-300 dark:bg-zinc-600'
                      }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamModal;