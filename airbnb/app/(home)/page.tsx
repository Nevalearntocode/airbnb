import Container from '@/components/container';
import Empty from './empty';
import getListings from '../actions/getListings';
import ListingCard from './listing-card';
import { getCurrentProfile } from '@/lib/current-profile';

export default async function Home() {
  const listing = await getListings();
  const profile = await getCurrentProfile();

  if (listing.length === 0) {
    return (
      <div className="pb-20 pt-28">
        <Empty
          title="No exact matches"
          subtitle="Try changing or removing some of your filter"
          showReset
          resetTitle='Remove filter'
        />
      </div>
    );
  }

  return (
    <div className="h-full pb-20 pt-8">
      <Container>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {listing.map((list) => (
            <ListingCard
              key={list.id}
              listing={list}
              profile={profile}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
