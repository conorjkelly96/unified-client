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

export const CREATE_JOB = gql`
  mutation Mutation($newJobInput: CreateJobInput!) {
    createJob(newJobInput: $newJobInput) {
      id
      title
      description
      url
      createdAt
      salary
      closingDate
    }
  }
`;
