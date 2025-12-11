import { NextResponse } from 'next/server'
import { products } from '@/data/products'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const category = searchParams.get('category')
  
  let filteredProducts = products
  
  if (type) {
    filteredProducts = filteredProducts.filter(p => p.type === type)
  }
  
  if (category && category !== 'Todos') {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    )
  }
  
  return NextResponse.json(filteredProducts)
}

