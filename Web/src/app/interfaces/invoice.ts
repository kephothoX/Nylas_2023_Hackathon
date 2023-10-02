
export interface Invoice {
  id: string;
  version: number;
  location_id: string;
  order_id: string;
  payment_requests: [
     {
       uid: string;
       request_type: string;
       due_date: string;
       tipping_enabled: boolean;
       computed_amount_money: {
          amount: number;
          currency: string;
       };
       total_completed_amount_money: {
          amount: number;
          currency: string;
       };
       automatic_payment_source: string;
     }
   ];
    primary_recipient: {
      customer_id: string;
      given_name: string;
      family_name: string;
      email_address: string;
      phone_number: string;
      company_name: string;
      address: {
        address_line_1: string;
        address_line_2: string;
        locality: string;
        administrative_district_level_1: string;
        postal_code: string;
        country: string;
      }
   };
   invoice_number: string;
   title: string;
   scheduled_at: string;
   status: string;
   timezone: string;
   created_at: string;
   updated_at: string;
   accepted_payment_methods: {
      card: boolean;
      square_gift_card: boolean;
      bank_account: boolean;
      buy_now_pay_later: boolean
   };
    delivery_method: string;
    sale_or_service_date: string;
    store_payment_method_enabled: boolean
}




