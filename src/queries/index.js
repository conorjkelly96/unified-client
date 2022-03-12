import { gql } from "@apollo/client";

export const COLLEGES = gql`
  query Query($id: ID!) {
    colleges(id: $id) {
      colleges
    }
  }
`;

export const UNIVERSITIES = gql`
  query Universities {
    universities {
      id
      name
    }
  }
`;

export const JOBS = gql`
  query Query {
    jobs {
      id
      title
      description
      url
      createdAt
      salary
      closingDate
      postedBy {
        firstName
        lastName
      }
    }
  }
`;
