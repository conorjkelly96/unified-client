import { gql } from "@apollo/client";

export const SIGNUP_STAFF = gql`
  mutation SignupStaff($input: SignupStaffInput!) {
    signupStaff(input: $input) {
      success
    }
  }
`;

export const SIGNUP_STUDENT = gql`
  mutation Mutation($input: SignupStudentInput!) {
    signupStudent(input: $input) {
      success
    }
  }
`;

export const LOGIN_STAFF = gql`
  mutation LoginStaff($input: LoginInput!) {
    loginStaff(input: $input) {
      token
      user {
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

export const LOGIN_STUDENT = gql`
  mutation LoginStudent($input: LoginInput!) {
    loginStudent(input: $input) {
      token
      user {
        id
        firstName
        lastName
        username
        email
        interests
        university {
          name
        }
        bio
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
      company
      description
      url
      createdAt
      salary
      closingDate
    }
  }
`;

export const DELETE_JOB_LISTING = gql`
  mutation Mutation($jobId: ID!) {
    deleteJob(jobId: $jobId) {
      id
    }
  }
`;
