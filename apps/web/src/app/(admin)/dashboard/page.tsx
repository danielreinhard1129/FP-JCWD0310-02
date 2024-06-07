'use client';
import {
  AlertCircle,
  ArrowUp,
  BadgeDollarSign,
  CalendarCheck2,
  LineChart,
  Ticket,
} from 'lucide-react';
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
  CardFooter,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CalendarDateRangePicker } from '@/components/DateRangePicker';
import { Overview } from '@/components/dashboard/Overview';
// import useGetOrganizerDataStatistic from '@/app/hooks/api/organizer/useGetOrganizerDataStatistic';
import { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import GaugeComponent from 'react-gauge-component';

const AdminDashboardPage = () => {
  // const { data, isLoading } = useGetOrganizerDataStatistic();
  const priceFormat = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  const chartData = [
    {
      name: 'jan',
      data: [
        { title: 'Ticket Sales', name: 'sales', value: 12 },
        {
          title: 'Attendance',
          name: 'attendance',
          value: 10,
        },
      ],
    },
    {
      name: 'feb',
      data: [
        { title: 'Ticket Sales', name: 'sales', value: 16 },
        {
          title: 'Attendance',
          name: 'attendance',
          value: 12,
        },
      ],
    },
    {
      name: 'mar',
      data: [
        { title: 'Ticket Sales', name: 'sales', value: 33 },
        {
          title: 'Attendance',
          name: 'attendance',
          value: 28,
        },
      ],
    },
    {
      name: 'apr',
      data: [
        { title: 'Ticket Sales', name: 'sales', value: 18 },
        {
          title: 'Attendance',
          name: 'attendance',
          value: 15,
        },
      ],
    },
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between gap-4 space-y-2">
          <h2 className="md:text-3xl text-2xl font-bold tracking-tight">
            Dashboard
          </h2>
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker className="" />
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Reports
            </TabsTrigger>
            <TabsTrigger value="notifications" disabled>
              Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default AdminDashboardPage;
