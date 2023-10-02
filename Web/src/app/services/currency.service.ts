import { Injectable } from '@angular/core';
import { Currency } from '../interfaces/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() { }

  Currency: Currency[] = [
    {
      name: "Kenya Shilings",
      abbrv: "KES"
    },

    {
      name: "American Dollar",
      abbrv: "USD"
    },

    {
      name: "Canadian Dollar",
      abbrv: "CAD"
    },

    {
      name: "European Dollar",
      abbrv: "EUR"
    },
  ]
}
