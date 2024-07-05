import React from 'react';
import { Card } from '@/components/ui/card';
import clsx from 'clsx';

interface ColorSwatchProps {
  name: string;
  className?: string;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const ColorSwatch: React.FC<ColorSwatchProps> = ({ name, className }) => {
  const displayName = name.split('-').map(capitalize).join(' ');

  return (
    <Card className={clsx('p-4 m-2 rounded shadow', className)}>
      <div className="text-center mb-2">
        <p className="font-bold">{displayName}</p>
      </div>
      <div
        className="h-24 w-full rounded border mb-2"
        style={{
          backgroundColor: `hsl(var(--${name}))`,
          borderColor: 'var(--border)',
        }}
      />
      <div className="mt-2 text-center">
        <p className="font-bold">Variable</p>
        <p>{`--${name}`}</p>
      </div>
    </Card>
  );
};

export default ColorSwatch;
