'use client';

import { ReactNode } from 'react';
import { ResumeProvider } from '@/context/ResumeContext';
import { ThemeProvider } from '@/context/ThemeContext';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <ResumeProvider>
                {children}
            </ResumeProvider>
        </ThemeProvider>
    );
}
