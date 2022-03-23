import { gql } from "@apollo/client";

// AUTH
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
        type
      }
    }
  }
`;

// MARKET
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

// JOBS
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

export const DELETE_ITEM = gql`
  mutation Mutation($itemId: String!) {
    deleteItem(itemId: $itemId) {
      id
    }
  }
`;

export const REMOVE_SAVED_JOB = gql`
  mutation Mutation($jobId: ID!) {
    removeSavedJobs(jobId: $jobId) {
      id
    }
  }
`;

export const CREATE_FORUM_POST = gql`
  mutation Mutation($forumPost: ForumPostInput!) {
    createForumPost(forumPost: $forumPost) {
      postText
      postedBy {
        id
      }
      createdAt
      tags
    }
  }
`;

export const ADD_TO_MY_ITEMS = gql`
  mutation Mutation($itemId: String!) {
    saveToMyItems(itemId: $itemId) {
      id
    }
  }
`;

export const CREATE_FORUM_REPLY = gql`
  mutation Mutation($postId: ID!, $input: ForumReplyInput) {
    forumReply(postId: $postId, input: $input) {
      id
    }
  }
`;

export const DELETE_FORUM_REPLY = gql`
  mutation Mutation($postId: ID!, $replyId: ID!) {
    deleteForumReply(postId: $postId, replyId: $replyId) {
      id
      replies {
        id
        text
      }
    }
  }
`;

export const EDIT_FORUM_POST = gql`
  mutation Mutation($updateForumPostId: ID!, $input: ForumPostInput!) {
    updateForumPost(id: $updateForumPostId, input: $input) {
      id
      replies {
        id
        text
      }
    }
  }
`;

export const UPDATE_FORUM_POST = gql`
  mutation Mutation($updateForumPostId: ID!, $input: ForumPostInput!) {
    updateForumPost(id: $updateForumPostId, input: $input) {
      id
    }
  }
`;

export const DELETE_FORUM_POST = gql`
  mutation Mutation($deleteForumPostId: ID!) {
    deleteForumPost(id: $deleteForumPostId) {
      id
    }
  }
`;

export const COMMENT_ON_ITEM = gql`
  mutation Mutation($input: ItemCommentInput) {
    addCommentToItem(input: $input) {
      comments {
        commentId
        commentBody
        username
      }
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation Mutation($itemId: String!, $input: UpdateItemInput!) {
    updateItem(itemId: $itemId, input: $input) {
      itemName
      itemDescription
      category
      status
      condition
      quantity
      price
      seller {
        id
        firstName
      }
    }
  }
`;

export const SAVE_JOB = gql`
  mutation Mutation($jobId: ID!) {
    saveJob(jobId: $jobId) {
      id
    }
  }
`;
