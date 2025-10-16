import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.helphub.app',
  appName: 'HelpHub',
  webDir: 'dist',
  server: {
    cleartext: true,
    androidScheme: 'http'
  }
};


export default config;
