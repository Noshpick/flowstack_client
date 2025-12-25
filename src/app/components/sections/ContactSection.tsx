'use client';

import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import QuarCodeImage from "../../../../public/images/contacts/qr-code.svg"
import Image from "next/image";
import Link from "next/link";

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section className="p-2">
      <div className="bg-white dark:bg-black rounded-3xl overflow-hidden">
        <div className="container md:py-10 md:px-14 mx-auto py-0">
          <div className="w-full bg-gradient rounded-3xl p-6 md:p-8">

            <div className="flex flex-col md:flex-row md:items-start items-center text-center md:text-start justify-between gap-8">
              <div className="flex-1 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {t("CONTACTS.title")}
                </h1>
                <p className="text-base md:text-lg mb-10 opacity-90">
                  {t("CONTACTS.description")}
                </p>
                <div className="text-center md:text-start">
                  <Link href={t("LINKS.support")}>
                    <Button
                      variant="secondary"
                      size="sm"
                      className=""
                    >
                      {t("CONTACTS.button", "Начать работу")}
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="hidden md:block flex-1">
                <div className="flex justify-end">
                  <div className="w-64 h-64 relative bg-white rounded-2xl">
                    <Image
                      src={QuarCodeImage} 
                      alt="QR Code"
                      fill
                      className="object-contain p-2 rounded-3xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:hidden mt-8">
              <div className="flex justify-center">
                <div className="w-68 h-68 relative bg-white rounded-2xl">
                  <Image
                    src={QuarCodeImage}
                    alt="QR Code"
                    fill
                    className="object-contain p-2 rounded-3xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}