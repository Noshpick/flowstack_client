'use client';

import { useState } from 'react';
import { useTranslation } from "react-i18next";
import SwiperSlider from '../ui/SwiperSlider';
import TeamMemberCard from '../ui/Card/CardTeamMember';
import TeamModal from '../ui/Modal/TeamModal';

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

export default function TeamSection() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(0);

  // Получаем данные команды из JSON
  const teamData = t("TEAM.members", { returnObjects: true }) as TeamMember[];

  const handleMemberClick = (index: number) => {
    setSelectedMemberIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="">
      <SwiperSlider
        title={t("TEAM.title")}
        subtitle={t("TEAM.subtitle")}
        slideWidth="!w-[85%] sm:!w-[70%] md:!w-45%]"
      >
        {teamData.map((member, index) => (
          <div key={member.id} className="h-full">
            <TeamMemberCard
              imageUrl={member.imageUrl}
              name={member.name}
              emoji={member.emoji}
              specialty={member.specialty}
              description={member.description}
              technologies={member.technologies}
              onButtonClick={() => handleMemberClick(index)}
              buttonText={member.buttonText}
              className="h-full"
              memberId={member.id}
            />
          </div>
        ))}
      </SwiperSlider>

      <TeamModal
        isOpen={isModalOpen}
        onClose={closeModal}
        members={teamData}
        initialIndex={selectedMemberIndex}
      />
    </section>
  );
}