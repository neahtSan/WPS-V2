'use client';

import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=12.3781011,99.8472372&zoom=17&size=600x300&markers=color:red%7Clabel:W%7C12.3781011,99.8472372&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;

  return (
    <footer className="bg-temple-green-dark text-black py-8 w-full">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
  {/* Address */}
  <div className="space-y-4 w-fit flex-shrink-0">
    <h3 className="text-xl font-semibold text-temple-gold">ที่อยู่</h3>
    <div className="flex items-start">
      <Image
        src="/icons/google-maps.svg"
        alt="Google Maps"
        width={24}
        height={24}
        className="mr-2 mt-1 flex-shrink-0 text-temple-gold"
      />
      <address className="not-italic text-sm leading-relaxed">
        วัดป่าสุญญตา<br />
        300 หมู่ที่ 7 ตำบล หนองตาแต้ม<br />
        ประจวบคีรีขันธ์, ประเทศไทย 77190
      </address>
    </div>
  </div>

  {/* Map */}
  <div className="w-full lg:max-w-xl">
    <Link
      href="https://maps.app.goo.gl/gkjDF4yHWHvNvDiJ7"
      target="_blank"
      className="block w-full rounded-md overflow-hidden cursor-pointer"
    >
      <Image
        src={staticMapUrl}
        alt="Wat Pasunyata Location Map"
        width={600}
        height={300}
        className="rounded-md w-full h-auto hover:brightness-90 transition"
      />
    </Link>
  </div>

  {/* Contact */}
  <div className="space-y-2 w-fit flex-shrink-0">
    <h3 className="text-xl font-semibold text-temple-gold">ติดต่อเรา</h3>
    <div className="flex items-center text-sm">
      <Image src="/icons/phone.svg" alt="Phone" width={24} height={24} className="mr-2" />
      <Link href="tel:0813769285" className="hover:text-temple-gold-light transition">
        0813769285
      </Link>
    </div>
    <div className="flex items-center text-sm">
      <Image src="/icons/gmail.svg" alt="Email" width={24} height={24} className="mr-2" />
      <Link href="mailto:info@watpasunyata.com" className="hover:text-temple-gold-light transition">
        info@watpasunyata.com
      </Link>
    </div>
    <div className="flex items-center text-sm">
      <Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} className="mr-2" />
      <Link
        href="https://www.facebook.com/WatpaSunyata"
        target="_blank"
        className="hover:text-temple-gold-light transition text-[#1877F2]"
      >
        วัดป่าสุญญตา 
      </Link>
    </div>
    <div className="flex items-center text-sm">
      <Image src="/icons/youtube.svg" alt="YouTube" width={24} height={24} className="mr-2" />
      <Link
        href="https://www.youtube.com/channel/UCd2wcvmQt4w8Ot4VYdNHRHA"
        target="_blank"
        className="hover:text-temple-gold-light transition text-[#FF0000]"
      >
        ช่องยูทูปของวัด Watpa Sonyata
      </Link>
    </div>
  </div>
</div>


        {/* Bottom Section */}
        <div className="border-t border-temple-green/30 mt-8 pt-4 text-center text-sm">
          <p>&copy; {currentYear} วัดป่าสุญญตา สงวนลิขสิทธิ์ทั้งหมด</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
