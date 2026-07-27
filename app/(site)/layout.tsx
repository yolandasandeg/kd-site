import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { getSiteBranding } from "@/sanity/lib/queries";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { logo } = await getSiteBranding();

  return (
    <>
      <Navbar logoImage={logo} />
      <main className="flex-1">{children}</main>
      <Footer logoImage={logo} />
      <WhatsAppButton />
    </>
  );
}
