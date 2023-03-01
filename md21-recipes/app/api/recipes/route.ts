import { NextResponse } from 'next/server';
// import dbConnect from '@/app/services/db';
// import Recipe from '../../utils/Models/RecipeModel';

export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });
  const data = await res.json();

  return NextResponse.json({ data })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const res = await fetch(`mongodb://localhost:27017/recipes-db/${id}`, {
    headers: {
      'Content-Type': 'application/json',
 
    },
  });
  const product = await res.json();

  return NextResponse.json({ product })
}

export async function POST() {
  const res = await fetch('mongodb://localhost:27017/recipes-db/...', {
    headers: {
      method: 'POST',
      'Content-Type': 'application/json',

    },
    body: JSON.stringify({ time: new Date().toISOString() }),
  });

  const data = await res.json();

  return  NextResponse.json(data);
}
