export const HOST_POSTINGS = '/postings'
export const HOST_POSTING_CREATE = '/postings/new'
export const HOST_POSTING_DETAIL = '/host/postings/:id'
export const HOST_APPLICATION_REVIEW = '/host/postings/:id/applications'

export function hostPostingDetailPath(id) {
    return HOST_POSTING_DETAIL.replace(':id', id)
}

export function hostApplicationReviewPath(id) {
    return HOST_APPLICATION_REVIEW.replace(':id', id)
}
