import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CartProvider } from "@/components/cart/CartContext";
import { CartWidget } from "@/components/cart/CartWidget";
import { getSiteBranding, getContactInfo } from "@/sanity/lib/queries";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [{ kdpackLogo, navLinks }, { whatsappNumber }] = await Promise.all([
    getSiteBranding(),
    getContactInfo(),
  ]);

  return (
    <CartProvider>
      <Navbar kdpackLogo={kdpackLogo} navLinks={navLinks} />
      <main className="flex-1">{children}</main>
      <Footer logoImage={kdpackLogo} />
      <WhatsAppButton />
      <CartWidget whatsappNumber={whatsappNumber} />
    </CartProvider>
  );
}
