import { gql } from "@apollo/client";

export const SIGNUP_STAFF = gql`
  mutation SignupStaff($input: SignupStaffInput!) {
    signupStaff(input: $input) {
      success
    }
  }
`;

export const LOGIN_STAFF = gql`
  mutation LoginStaff($input: LoginInput!) {
    loginStaff(input: $input) {
      token
      staff {
        id
        firstName
        lastName
        username
        email
        university {
          name
        }
        college
      }
    }
  }
`;

export const CREATE_ITEM = gql`
  mutation CreateItem($input: CreateItemInput!) {
    createItem(input: $input) {
      itemName
      itemDescription
      category
      status
      condition
      price
      quantity
      images
    }
  }
`;
