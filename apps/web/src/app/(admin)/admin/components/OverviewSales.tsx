import React, { FC } from 'react';
import OverviewCard from './OverviewCard';
import { ShoppingBag } from 'lucide-react';
import TopOverviewCard from './TopOverviewCardProduct';
import TopOverviewCardCategory from './TopOverviewCardCategory';
import OverviewChart from './OverviewChart';
import RecentOrders from './RecentOrders';

interface IOverviewSalesProps {
  dataSales: any;
}

const OverviewSales: FC<IOverviewSalesProps> = ({ dataSales }) => {
  return (
    <div className="flex flex-col gap-4 font-rubik transition-all duration-300">
      <div className="grid grid-cols-3 gap-4 rounded-lg">
        <OverviewCard
          Icon={ShoppingBag}
          title="Revenue"
          value={dataSales?.data.revenue}
          total={0}
        />
        <OverviewCard
          Icon={ShoppingBag}
          title="Active Orders"
          value={dataSales?.data.activeOrders.total || 0}
          total={dataSales?.data.activeOrders.count || 0}
        />
        <OverviewCard
          Icon={ShoppingBag}
          title="Cancelled Orders"
          value={dataSales?.data.cancelledOrders.total || 0}
          total={dataSales?.data.cancelledOrders.count || 0}
        />
      </div>
      <div className="rounded-lg grid grid-cols-2 gap-4">
        <TopOverviewCard
          title="Best By Product Seller"
          buttonLabel="REPORT"
          data={dataSales?.data.salesByProduct.map((val: any) => {
            return {
              productName: val.name,
              productPrice: val.price,
              productRevenue: val.total,
              productSales: val.count,
              productImageUrl: val.productImages[0].url,
            };
          })}
        />
        <TopOverviewCardCategory
          title="Best By Category Seller"
          buttonLabel="REPORT"
          data={dataSales?.data.salesByCategory}
        />
      </div>
      <OverviewChart data={dataSales?.data} />
      <RecentOrders data={dataSales?.data.recentOrder} />
    </div>
  );
};

export default OverviewSales;
