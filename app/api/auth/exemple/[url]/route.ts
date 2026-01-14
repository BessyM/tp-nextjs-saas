import type { NextRequest } from 'next/server'
import { IExemple } from '@/app/interfaces/exemple'

export async function GET(request: NextRequest, { params }: IExemple) {
  const { href } = request.nextUrl

  console.log((await params).url)

  return Response.json({ message: 'Hello World'})
}