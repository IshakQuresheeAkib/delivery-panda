export interface RiderProfile {
  id: string;
  name: string;
  displayName: string;
  avatar?: string;
  email: string;
  phone: string;
  vehicleType: 'feet' | 'bicycle' | 'motorcycle' | 'car';
  certified: boolean;
  identificationStatus: 'pending' | 'verified' | 'rejected';
  contract: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export const mockRider: RiderProfile = {
  id: 'rider-001',
  name: 'Sayem panda',
  displayName: '【CLX】Abdullah Pan...',
  avatar: undefined,
  email: 'Alomgirazad20@gmail.com',
  phone: '7417415857',
  vehicleType: 'feet',
  certified: true,
  identificationStatus: 'verified',
  contract: 'Authorised agreement',
  emergencyContact: undefined,
};

export interface AppSettings {
  allowReminder: boolean;
  appSnapshotFeedback: boolean;
  vibration: boolean;
  volume: number;
  navigationSettings: string;
  darkMode: 'always_on' | 'always_off' | 'system';
  mapCallSettings: 'latitude_longitude' | 'address';
  language: string;
  orderAcceptingSetting: boolean;
}

export const mockSettings: AppSettings = {
  allowReminder: false,
  appSnapshotFeedback: false,
  vibration: true,
  volume: 0.4,
  navigationSettings: 'Not set',
  darkMode: 'always_off',
  mapCallSettings: 'latitude_longitude',
  language: 'English',
  orderAcceptingSetting: false,
};

export const appVersion = '5.81.1';
