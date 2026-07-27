import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { getSiteBranding } from "@/sanity/lib/queries";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { logo, kdpackLogo, konstruplastLogo, navLinks } = await getSiteBranding();

  return (
    <>
      <Navbar
        logoImage={logo}
        kdpackLogo={kdpackLogo}
        konstruplastLogo={konstruplastLogo}
        navLinks={navLinks}
      />
      <main className="flex-1">{children}</main>
      <Footer logoImage={logo} />
      <WhatsAppButton />
    </>
  );
}
