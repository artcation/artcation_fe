// 호스트 화면 경로 실주소 나중에 바뀔 가능성 높음
export const HOST_POSTINGS = '/host/postings'
export const HOST_POSTING_CREATE = '/host/postings/new'
export const HOST_POSTING_DETAIL = '/host/postings/:id'
export const HOST_APPLICATION_REVIEW = '/host/postings/:id/applications'

export function hostPostingDetailPath(id) {
    return HOST_POSTING_DETAIL.replace(':id', id)
}

export function hostApplicationReviewPath(id) {
    return HOST_APPLICATION_REVIEW.replace(':id', id)
}
