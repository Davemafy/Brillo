export const mapUser = (user: any): AppUser => {
  const metadata = user.user_metadata || {};
  const isGoogle = user.app_metadata?.provider === 'google';

  return {
    id: user.id,
    email: user.email ?? '',
    name: metadata.full_name || metadata.name || 'New User',
    avatar: metadata.avatar_url || '',
    provider: isGoogle ? 'google' : 'email',
  };
};
