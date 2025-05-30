import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function generateMetadata({ params }) {
  return {
    title: `Reviews for ${params.slug}`,
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
    <div>
      <h1>Reviews for {slug}</h1>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <ul>
          {reviews.map((r) => (
            <li key={r.id}>
              <h2>{r.title}</h2>
              <p>{r.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
