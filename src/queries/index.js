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

export const GET_STUDENT_JOBS = gql`
  query Query {
    getStudentJobs {
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
  query ForumPosts {
    forumPosts {
      id
      postText
      postedBy {
        id
        username
        college
        profileImageUrl
      }
      createdAt
      replyCount
    }
  }
`;

export const GET_FORUM_POST = gql`
  query Query($postId: ID!) {
    getForumPost(postId: $postId) {
      id
      postText
      postedBy {
        id
        username
        college
      }
      createdAt
      replies {
        id
        text
        createdAt
        user {
          id
          firstName
          lastName
          username
          profileImageUrl
        }
      }
    }
  }
`;
