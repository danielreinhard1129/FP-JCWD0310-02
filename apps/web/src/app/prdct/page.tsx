// Page.tsx
import ProductList from '@/components/tstprdct/PrdctList';
import axios from 'axios';

export default async function Page() {
  const response = await axios.get('http://localhost:8000/api/product');
  const data = response.data.data; // Access the array inside the 'data' property

  return <ProductList data={data} />;
}
