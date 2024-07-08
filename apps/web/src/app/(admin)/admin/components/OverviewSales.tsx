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
      <div className="grid md:grid-cols-3 gap-4 rounded-lg">
        <OverviewCard
          Icon={ShoppingBag}
          title="Revenue"
          type="currency"
          value={dataSales?.data.revenue}
          total={0}
        />
        <OverviewCard
          Icon={ShoppingBag}
          title="Active Orders"
          type="currency"
          value={dataSales?.data.activeOrders.total || 0}
          total={dataSales?.data.activeOrders.count || 0}
        />
        <OverviewCard
          Icon={ShoppingBag}
          title="Cancelled Orders"
          type="currency"
          value={dataSales?.data.cancelledOrders.total || 0}
          total={dataSales?.data.cancelledOrders.count || 0}
        />
      </div>
      <div className="rounded-lg grid md:grid-cols-2 gap-4">
        <TopOverviewCard
          title="Best By Product Seller"
          buttonLabel="REPORT"
          data={dataSales?.data.salesByProduct
            .sort(
              (a: any, b: any) => b.count._sum.quantity - a.count._sum.quantity,
            )
            .map((val: any) => {
              return {
                productName: val.name,
                productPrice: val.price,
                productRevenue: val.price * val.count._sum.quantity,
                productSales: val.count._sum.quantity,
                productImageUrl: val.productImages[0].url,
              };
            })}
        />
        <TopOverviewCardCategory
          title="Best By Category Seller"
          buttonLabel="REPORT"
          data={dataSales?.data.salesByCategory.sort(
            (a: any, b: any) => b.count._sum.quantity - a.count._sum.quantity,
          )}
        />
      </div>
      <OverviewChart data={dataSales?.data} />
      <RecentOrders data={dataSales?.data.recentOrder} />
    </div>
  );
};

export default OverviewSales;
