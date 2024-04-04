import Container from '@/components/container';
import getListings from '../actions/getListings';
import { getCurrentProfile } from '@/lib/current-profile';
import ListingFilter from './listing-filter';

export default async function Home() {
  const listing = await getListings();
  const profile = await getCurrentProfile();

  return (
    <div className="h-full pb-20 pt-8">
      <Container>
        <ListingFilter listings={listing} profile={profile} />
      </Container>
    </div>
  );
}
