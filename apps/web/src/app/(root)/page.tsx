import React from 'react';
import HeroPage from './components/Hero';
import MostPopuler from './components/MostPopuler';
import IklanPage from './components/Iklan';
import CategoryPage from './components/Category';
import ProductsPage from './components/Products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const page = () => {
  return (
    <>
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Test</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Test</p>
          </CardContent>
        </Card>
      </div>
      {/* <section className="flex  flex-col gap-y-20">
       <HeroPage />
       <div>ini most populer</div> 
       <MostPopuler />
       <IklanPage />
       <CategoryPage />
       <IklanPage />
       <ProductsPage />
       </section>
      */}
    </>
  );
};

export default page;
