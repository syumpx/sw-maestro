import type { Metadata } from "next";
import localFont from "next/font/local";
import { TrackPageView } from "@/components/analytics/TrackPageView";
import "./globals.css";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "창업자 성향 테스트",
  description: "40개의 질문으로 알아보는 나의 창업자 성향",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard antialiased`}>
        <TrackPageView />
        {children}
      </body>
    </html>
  );
}
