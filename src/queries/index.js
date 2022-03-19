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
  query Query {
    viewAllItems {
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
  query Query {
    viewMyItems {
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
  query Query {
    forumPosts {
      id
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

export const GET_SINGLE_ITEM_DATA = gql`
  query Query {
    getSingleItemData {
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
