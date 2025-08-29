import { Capacitor } from '@capacitor/core';

export const IS_WEB = Capacitor.getPlatform() === 'web';
export const IS_MOBILE = Capacitor.getPlatform() === 'ios' || Capacitor.getPlatform() === 'android';
export const IS_IOS = Capacitor.getPlatform() === 'ios';
export const IS_ANDROID = Capacitor.getPlatform() === 'android';
