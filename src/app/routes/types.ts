import type { ReactNode } from 'react';

export type LayoutConfig = {
  navbar?: boolean;
  toolbar?: boolean;
  footer?: boolean;
  leftSidePanel?: boolean;
  rightSidePanel?: boolean;
};

export type AppRoute = {
  path: string;
  element: ReactNode;
  settings?: {
    layout?: {
      config?: LayoutConfig;
    };
  };
  auth?: string[]; // roles permitidas
};
