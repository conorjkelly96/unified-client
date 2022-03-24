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

export const VIEW_ALL_ITEMS = gql`
  query Query($category: String) {
    viewAllItems(category: $category) {
      id
      itemName
      itemDescription
      category
      status
      condition
      price
      quantity
      seller {
        id
        username
      }
      images
    }
  }
`;

export const VIEW_MY_ITEMS_FOR_SALE = gql`
  query Query($category: String) {
    viewAllItems(category: $category) {
      id
      itemName
      itemDescription
      category
      status
      condition
      price
      quantity
      seller {
        id
        username
      }
      images
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
      tags
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

export const GET_SINGLE_ITEM_DATA = gql`
  query GetSingleItemData($id: ID!) {
    getSingleItemData(id: $id) {
      id
      itemName
      itemDescription
      category
      status
      condition
      price
      quantity
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

export const GET_ITEMS_BY_CATEGORY = gql`
  query Query($input: String!) {
    getItemsByCategory(input: $input) {
      id
      itemName
      itemDescription
      category
      status
      condition
      price
      quantity
    }
  }
`;

export const GET_COMMENTS_ON_MY_ITEMS = gql`
  query Query {
    getCommentsOnMyItems {
      itemName
      comments {
        commentId
        commentBody
        username
      }
    }
  }
`;

export const TAGS = gql`
  query Query {
    tags {
      name
    }
  }
`;
