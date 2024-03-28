import { CurrentUser } from '@/lib/current-user';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

const handleAuth = async () => {
  const user = await CurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  return {
    userId: user.id,
  };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  yourHomeImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
