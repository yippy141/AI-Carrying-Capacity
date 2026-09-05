import {readFileSync} from 'node:fs';
import {z} from 'zod';

const reviewSchema = z.object({
  edition: z.string().min(1),
  authorCopyStatus: z.enum(['pending', 'approved']),
  authorReviewer: z.string().min(1).nullable(),
  bylineAssent: z.enum(['pending', 'approved']),
  outsideReaders: z.array(z.unknown()),
  exactUseReview: z.enum(['pending', 'approved']),
  publicationAuthorized: z.boolean()
}).strict();

export function loadPublicationReview() {
  return reviewSchema.parse(JSON.parse(readFileSync('research/reader-edition/release-review.json', 'utf8')));
}
export function requirePublicationReview(input: unknown) {
  const review = reviewSchema.parse(input);
  if (review.authorCopyStatus !== 'approved' || !review.authorReviewer) throw new Error('Author copy reading/edit pending');
  if (review.bylineAssent !== 'approved') throw new Error('Byline assent pending');
  if (review.exactUseReview !== 'approved') throw new Error('Exact-use release review pending');
  if (!review.publicationAuthorized) throw new Error('Publication authorization missing');
  return review;
}
