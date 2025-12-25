'use client';

import Link from 'next/link';
import { useTranslation } from "react-i18next";
import { FiMail, FiMapPin } from 'react-icons/fi';
import { FaTelegramPlane } from 'react-icons/fa';
import LogoImage from "../../../../public/logo-flowstack.svg"
import Image from 'next/image';

const Footer = () => {
    const { t } = useTranslation();

    const navigation = [
        { name: t('FOOTER.navigation.home'), href: '/' },
        { name: t('FOOTER.navigation.services'), href: '#services' },
        { name: t('FOOTER.navigation.portfolio'), href: '#portfolio' },
        { name: t('FOOTER.navigation.contacts'), href: '#contact' },
    ];

    const contacts = [
        {
            icon: FaTelegramPlane,
            text: t('FOOTER.information.telegram'),
            href: t("LINKS.support")
        },
        {
            icon: FiMail,
            text: t('FOOTER.information.email'),
            href: 'mailto:info@gmail.com'
        },
        {
            icon: FiMapPin,
            text: t('FOOTER.information.adress'),
            href: '#'
        }
    ];

    return (
        <footer className="bg-zinc-900 text-white pt-16 pb-8">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-start mb-4">
                            <div className="relative w-28 h-14">
                                <Image
                                    src={LogoImage}
                                    alt="Logo FlowStack"
                                    fill
                                    className="items-start text-start"
                                    priority
                                />
                            </div>
                        </Link>
                        <p className="text-zinc-400 text-base max-w-md">
                            {t('FOOTER.description')}
                        </p>
                    </div>

                    <div>
                        <nav className="space-y-3">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block text-zinc-400 hover:text-green-400 transition-colors duration-200 text-base"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <div className="space-y-3">
                            {contacts.map((contact, index) => (
                                <a
                                    key={index}
                                    href={contact.href}
                                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="flex items-center text-zinc-400 hover:text-green-400 transition-colors duration-200"
                                >
                                    <contact.icon className="w-5 h-5 mr-3 flex-shrink-0 text-green-600 text-small" />
                                    <span className="text-base">{contact.text}</span>
                                </a>
                            ))}
                        </div>

                    </div>
                </div>

                <div className="border-t border-zinc-800 mb-8" />

                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-zinc-500 text-base">
                        {t('FOOTER.copyright')}
                    </p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;