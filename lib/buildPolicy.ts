export type BuildMode = 'review-preview' | 'publication';
type Environment = Record<string, string | undefined>;

export function productionEnvironment(env: Environment): boolean {
  return env.VERCEL_ENV === 'production' || env.VERCEL_TARGET_ENV === 'production';
}

/** NODE_ENV=production also describes optimized preview compilation; it is
 * deliberately not used as a deployment-target signal. */
export function resolveBuildMode(env: Environment, args: string[] = []): BuildMode {
  if (args.some(arg => !['--production', '--preview'].includes(arg))) throw new Error('Unknown build option');
  const requested = env.READER_EDITION_MODE;
  if (requested && !['review-preview', 'publication'].includes(requested)) throw new Error('Invalid edition mode');
  if (args.includes('--production') && args.includes('--preview')) throw new Error('Conflicting build options');
  const production = productionEnvironment(env) || args.includes('--production') || requested === 'publication';
  if (production && (args.includes('--preview') || requested === 'review-preview')) throw new Error('Review-preview cannot override a production build');
  if (env.VERCEL === '1' && !env.VERCEL_ENV && !env.VERCEL_TARGET_ENV && !production) throw new Error('Vercel deployment target missing; refusing an ambiguous build');
  return production ? 'publication' : 'review-preview';
}
