export interface Company {
  id: string;
  name: string;
  taxNumber: string;
  customCurrency: string;
  language: string;
  updateCostPriceOnMasterUpdate: boolean;
  explicitConsent: boolean;
  eraseCustomerData: boolean;
  runReportsOnPageLoad: boolean;
  showIncExTaxOption: boolean;
  maxNoOfDevices: number;
  maxNoOfLocations: number;
  showInstructionsOnStartup: boolean;
}
