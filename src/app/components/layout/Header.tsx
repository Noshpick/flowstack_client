'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import ThemeButton from '@/contexts/ThemeButton';
import LanguageToggle from '@/contexts/LanguageButton';
import "../../../../i18n/i18n";
import { useTranslation } from "react-i18next";
import LogoImage from "../../../../public/logo-flowstack.svg"
import { FiArrowUpRight } from "react-icons/fi";
import Image from 'next/image';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { t } = useTranslation();

    const navigation = [
        { id: 'services', name: t('HEADER.services'), href: 'services' },
        { id: 'portfolio', name: t('HEADER.portfolio'), href: 'portfolio' },
        { id: 'contact', name: t('HEADER.contacts'), href: 'contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        setIsMenuOpen(false);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  ${isScrolled ? 'md:p-2' : 'p-2 '}`}>
            <div className={`bg-primary rounded-3xl transition-all duration-300 ${isScrolled ? 'md:rounded-3xl rounded-none' : 'md:rounded-3xl'}`}>
                <div className="container-custom py-2">
                    <div className="flex justify-between items-center mb-2 md:mb-0">
                        <Link href="/" className="flex items-start">
                            <div className="relative w-20 h-10">
                                <Image
                                    src={LogoImage}
                                    alt="Logo FlowStack"
                                    fill
                                    className="items-start text-start"
                                    priority
                                />
                            </div>
                        </Link>

                        <nav className="hidden md:flex items-center space-x-8">
                            {navigation.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.href)}
                                    className="text-zinc-700 hover:text-green-600 dark:text-zinc-100 transition-colors duration-500 cursor-pointer text-sm"
                                >
                                    <span suppressHydrationWarning>{item.name}</span>
                                </button>
                            ))}
                        </nav>

                        <div className="flex items-center text-end space-x-4">
                            <LanguageToggle />
                            <ThemeButton />

                            <div className="hidden md:block">
                                <Link href={t("LINKS.support")}>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        <span suppressHydrationWarning>{t("HEADER.contactUs")}</span>
                                        <FiArrowUpRight className="ml-2" />
                                    </Button>
                                </Link>
                            </div>

                            <button
                                className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative"
                                onClick={toggleMenu}
                                aria-label="Открыть меню"
                            >
                                <span className={`
                                    block w-6 h-0.5 bg-zinc-700 dark:bg-zinc-100 transition-all duration-300
                                    ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}
                                `} />
                                <span className={`
                                    block w-6 h-0.5 bg-zinc-700 dark:bg-zinc-100 my-1.5 transition-all duration-300
                                    ${isMenuOpen ? 'opacity-0' : 'opacity-100'}
                                `} />
                                <span className={`
                                    block w-6 h-0.5 bg-zinc-700 dark:bg-zinc-100 transition-all duration-300
                                    ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}
                                `} />
                            </button>
                        </div>
                    </div>

                    <div className={`
                        md:hidden bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700
                        transition-all duration-300 overflow-hidden
                        ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                    `}>
                        <nav className="flex flex-col space-y-4 p-4">
                            {navigation.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => scrollToSection(item.href)}
                                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 font-medium py-2 px-0 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-left"
                                >
                                    <span suppressHydrationWarning>{item.name}</span>
                                </button>
                            ))}
                                <Link href={t("LINKS.support")}>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    <span suppressHydrationWarning>{t("HEADER.contactUs")}</span>
                                    <FiArrowUpRight className="ml-2" />
                                </Button>
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;