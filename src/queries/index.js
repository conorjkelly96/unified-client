import { gql } from "@apollo/client";

// SIGNUP
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

// JOBS
export const JOBS = gql`
  query Query {
    jobs {
      id
      title
      company
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

export const GET_STAFF_JOBS = gql`
  query Query {
    getStaffJobs {
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

// FORUM
export const GET_FORUM_POSTS = gql`
  query Query {
    forumPosts {
      postText
      postedBy {
        username
        college
        id
      }
      createdAt
      replies
    }
  }
`;
