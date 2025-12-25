'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from "react-i18next";
import { FiX, FiExternalLink, FiClock, FiUsers, FiBriefcase, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';
import Button from '../Button';

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
  onClose?: () => void;
}

interface CaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudy;
}

const CaseModal: React.FC<CaseModalProps> = ({ isOpen, onClose, caseStudy }) => {
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 👇 единый закрыватель: сначала снимаем фокус, потом закрываем
  const handleClose = useCallback(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // 👇 критично: снимаем фокус с кнопки-триггера при ОТКРЫТИИ модалки
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    } else {
      document.body.style.overflow = 'unset';
      setLightboxOpen(false);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const goToPrev = () => setCurrentImageIndex(prev => prev === 0 ? caseStudy.gallery.length - 1 : prev - 1);
  const goToNext = () => setCurrentImageIndex(prev => prev === caseStudy.gallery.length - 1 ? 0 : prev + 1);

  if (!isOpen) return null;

  // Лайтбокс: стрелки и Esc
useEffect(() => {
  if (!lightboxOpen) return;

  const onKeyCapture = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Escape') {
      // блокируем «проброс» в родительские слушатели (карусель/страницу)
      e.preventDefault();
      e.stopPropagation();

      e.stopImmediatePropagation?.();

      if (e.key === 'ArrowLeft') goToPrev();
      else if (e.key === 'ArrowRight') goToNext();
      else if (e.key === 'Escape') closeLightbox();
    }
  };

  // Вешаем в фазе захвата (третьим аргументом true), чтобы перехватить раньше всех
  window.addEventListener('keydown', onKeyCapture, true);
  return () => window.removeEventListener('keydown', onKeyCapture, true);
}, [lightboxOpen, goToPrev, goToNext, closeLightbox]);

  // Модалка: Esc закрывает (когда лайтбокс закрыт)
  useEffect(() => {
    if (!isOpen || lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // на всякий случай снимаем фокус и закрываем
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, lightboxOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !lightboxOpen) handleClose();
  };


  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="relative bg-white dark:bg-zinc-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
          <button
            onClick={onClose}
            className="cursor-pointer absolute top-4 right-4 z-10 p-2 rounded-full bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow"
          >
            <FiX className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
          </button>

          <div className="overflow-y-auto max-h-[90vh] p-6 md:p-8">
            {caseStudy.image && (
              // <div className="relative mb-8 rounded-xl overflow-hidden">
                <div className="w-full aspect-[3/2] overflow-hidden relative rounded-xl mb-4 bg-gray-100 dark:bg-zinc-700/30 flex items-center justify-center">
                  <Image
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    fill
                    className="object-contain rounded-xl"
                  />
                {/* </div> */}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-white mb-4">
                    {caseStudy.title}
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {caseStudy.fullDescription}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FiClock className="w-4 h-4 text-zinc-600 dark:text-zinc-400 mr-2" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {t("PORTFOLIO.block_titles.deadlines")}
                      </span>
                    </div>
                    <div className="font-semibold text-zinc-800 dark:text-white">{caseStudy.duration}</div>
                  </div>

                  <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FiUsers className="w-4 h-4 text-zinc-600 dark:text-zinc-400 mr-2" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {t("PORTFOLIO.block_titles.team")}
                      </span>
                    </div>
                    <div className="font-semibold text-zinc-800 dark:text-white">{caseStudy.teamSize}</div>
                  </div>

                  <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg col-span-2">
                    <div className="flex items-center mb-2">
                      <FiBriefcase className="w-4 h-4 text-zinc-600 dark:text-zinc-400 mr-2" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {t("PORTFOLIO.block_titles.client")}
                      </span>
                    </div>
                    <div className="font-semibold text-zinc-800 dark:text-white">{caseStudy.client}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-3">
                    {t("PORTFOLIO.block_titles.problems")}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-300">
                    {caseStudy.challenges}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-3">
                    {t("PORTFOLIO.block_titles.solutions")}
                  </h3>
                  <ul className="space-y-2">
                    {caseStudy.solutions.map((solution, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-green-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-zinc-600 dark:text-zinc-300">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-3">
                    {t("PORTFOLIO.block_titles.results")}
                  </h3>
                  <div className="space-y-2">
                    {caseStudy.metrics.map((metric, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-zinc-200 dark:border-zinc-700 last:border-b-0">
                        <span className="text-zinc-600 dark:text-zinc-300">{metric.split(':')[0]}:</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          {metric.split(':')[1]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-3">
                    {t("PORTFOLIO.block_titles.technologies")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {caseStudy.gallery && caseStudy.gallery.length > 0 && (
                  <div className="pt-4">
                    <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-3">
                      {t("PORTFOLIO.block_titles.screenshots")}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {caseStudy.gallery.map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-[3/2] rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
                          onClick={() => openLightbox(index)}
                        >
                          <Image
                            src={image}
                            alt={`Скриншот проекта ${caseStudy.title} ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="primary"
                    onClick={() => window.open(caseStudy.siteUrl, '_blank')}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    {t("PORTFOLIO.buttons.go_to_website")}
                    <FiExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white"
          >
            <FiX className="w-8 h-8" />
          </button>

          <button
            onClick={goToPrev}
            className="absolute left-4 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white"
          >
            <FiChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white"
          >
            <FiChevronRight className="w-8 h-8" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center p-4">
            <div className="relative w-full h-4/5">
              <Image
                src={caseStudy.gallery[currentImageIndex]}
                alt={`Скриншот проекта ${caseStudy.title} ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
            {currentImageIndex + 1} / {caseStudy.gallery.length}
          </div>
        </div>
      )}
    </>
  );
};

export default CaseModal;