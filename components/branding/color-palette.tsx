'use client';
import React, { useState } from 'react';
import ColorSwatch from './color-swatch';
import { Button } from '../ui/button';

const colorVariables = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'destructive',
  'destructive-foreground',
  'border',
  'input',
  'ring',
];

const ColorPalette: React.FC = () => {
  const [localTheme, setLocalTheme] = useState('');

  const handleSetLightTheme = () => setLocalTheme('light');
  const handleSetDarkTheme = () => setLocalTheme('dark');

  return (
    <>
      <div className={`flex space-x-4 justify-center`}>
        <Button
          variant="secondary"
          className="my-4"
          onClick={handleSetLightTheme}
        >
          See Light Theme
        </Button>
        <Button variant="default" className="my-4" onClick={handleSetDarkTheme}>
          See Dark Theme
        </Button>
      </div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6 gap-4 p-8 ${localTheme}`}
      >
        {colorVariables.map((variable) => (
          <ColorSwatch key={variable} name={variable} className="h-full" />
        ))}
      </div>
    </>
  );
};

export default ColorPalette;
