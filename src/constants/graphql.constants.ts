import { gql } from '@apollo/client';

export const SIGNIN_QUERY = gql`
  mutation signin($email: String, $password: String) {
    signin(email: $email, password: $password) {
      result
    }
  }
`;

export const SIGNOUT_QUERY = gql`
  mutation signout {
    signout {
      result
    }
  }
`;

export const GET_MEMBER_QUERY = gql`
  query getMember {
    member {
      id
      activated
      api_disabled
      app_activated
      country_code
      created_at
      disabled
      display_name
      email
      email_activated
      id_document_state
      id_document_verified
      id_document_third_verified
      identity_id
      last_security_action_at
      name
      nickname
      security_settings_changed_within_h24
      sms_activated
      sn
      state
      updated_at
      withdraw_amount_h24
      withdraw_disabled
      member_tags
      income
      force_kyc
    }
  }
`;
