import React from "react";
import dynamic from "next/dynamic";

const ColorPalette = dynamic(
  () => import("@/components/branding/color-palette"),
  { ssr: false }
);

const Page: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-center text-foreground p-4">
      <h1 className="text-3xl font-bold mb-4 ">Frigear Color Palette</h1>
      <ColorPalette />
    </div>
  );
};

export default Page;
