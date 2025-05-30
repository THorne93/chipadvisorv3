// app/country/[slug]/page.js (server component)
import { PrismaClient } from '@prisma/client';
import Reviews from './Reviews';

const prisma = new PrismaClient();

export async function generateMetadata({ params }) {
  const readableCountry = params.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    title: `Reviews for ${readableCountry}`,
  };
}

export default async function CountryPage({ params }) {
  const { slug } = params;
  const readableCountry = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const reviews = await prisma.reviews.findMany({
    where: {
      location: {
        path: ['country'],
        equals: readableCountry,
      },
    },
  });

  return (
    <div className="mt-10 mx-auto w-3/4">
      <h1>Reviews for {readableCountry}</h1>
      <Reviews reviews={reviews} />
    </div>
  );
}
