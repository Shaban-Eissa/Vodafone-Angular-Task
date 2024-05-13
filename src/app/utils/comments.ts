import { TComment } from "./types";

export function resetComments() {
  return {
    showComments: false,
    selectedPostId: null,
    selectedPostComments: [],
    selectedCardId: null,
  };
}

export function setComments(data: TComment[], postId: number) {
  return {
    selectedPostComments: data,
    selectedPostId: postId,
    showComments: true,
    selectedCardId: postId,
  };
}
