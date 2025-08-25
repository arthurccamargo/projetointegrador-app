import type { ReactNode } from 'react';

export type AppRoute = {
  path: string;
  element: ReactNode;
  settings?: {
    layout?: {
      config?: {
        navbar?: { display: boolean };
        toolbar?: { display: boolean };
        footer?: { display: boolean };
        leftSidePanel?: { display: boolean };
        rightSidePanel?: { display: boolean };
      };
    };
  };
  auth?: string[]; // roles permitidas
};
