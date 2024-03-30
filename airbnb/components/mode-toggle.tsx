'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Switch } from './ui/switch';

type Props = {
  mode: 'switch' | 'button';
};

export function ModeToggle({ mode }: Props) {
  const { setTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  });

  const onToggle = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {mode === 'switch' && (
        <Switch checked={theme === 'dark'} onClick={onToggle} />
      )}
      {mode === 'button' && (
        <Button
          variant="outline"
          size="icon"
          onClick={onToggle}
          className="rounded-full"
        >
          {theme === 'dark' ? (
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          )}
        </Button>
      )}
    </>
  );
}
