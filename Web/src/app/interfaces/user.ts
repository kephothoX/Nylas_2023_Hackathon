import { Address } from './address';


export interface User extends Address{
  given_name: string | undefined | null;
  family_name: string | undefined | null;
  email_address: string | undefined | null;
  company_name: string | undefined | null;
  phone_number: string | undefined | null;
}


export interface AdminUser {
  given_name: string | undefined | null;
  family_name: string | undefined | null;
  email_address: string | undefined | null;
  password: string | undefined | null;
  phone_number: string | undefined | null;
}

export interface UserCredentials {
  email_address: string | undefined | null;
  password: string | undefined | null;
  active?: boolean,
}

export interface EditUser {
  address: Address
  given_name: string | undefined | null;
  family_name: string | undefined | null;
  email_address: string | undefined | null;
  company_name: string | undefined | null;
  phone_number: string | undefined | null;
}
