import type { Metadata } from "next";
import "./globals.css";
import ClientShell from "@/components/ClientShell";

export const metadata: Metadata = {
  title: "Realty Chamber | Best Property Dealer & Real Estate Consultant in Jaipur",
  description: "Are you looking for the best real estate consultant, property dealer and real estate agent in Jaipur? Get in touch with Realty Chamber for all your residential, commercial, industrial & agricultural property needs in Rajasthan.",
  keywords: "Real Estate Agent Jaipur, Property Dealer Jaipur, Real Estate Consultant Malviya Nagar, Buy Property Jaipur, Rent House Jaipur, Mahima Group Projects, Commercial Office Space Jaipur, Joint Venture Land Jaipur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
