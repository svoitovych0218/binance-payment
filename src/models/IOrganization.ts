export interface IOrganization {
    _id: string;
    SK: string;
    name: string;
    email: string;
    phoneNumber: string;
    payedTill: string;
    clientId?: string;
    clientSecret?: string;
  }