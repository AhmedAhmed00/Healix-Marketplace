import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/shared/table'
import { ProductSales } from '../types'
import { productColumns } from './ProductTableColumns'

interface ProductsTabProps {
  products: ProductSales[]
}

export function ProductsTab({ products }: ProductsTabProps) {
  return (
    <div className="space-y-6">
      <Card className="border-none bg-transparent shadow-none hover:shadow-none">
        <CardHeader className="px-0">
          <CardTitle className="text-[#1974BB]">Top Products</CardTitle>
          <CardDescription>
            Best performing products by sales and revenue
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <DataTable columns={productColumns} data={products} />
        </CardContent>
      </Card>
    </div>
  )
}
