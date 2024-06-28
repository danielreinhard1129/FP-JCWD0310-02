import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../../components/ui/dialog';
import { Boxes, Import, SquarePlus } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';
import { Label } from '../../../../../components/ui/label';
import { Popover, Select } from 'antd';
import { Input } from '../../../../../components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../../components/ui/tabs';

const DialogStock = ({ productId }: { productId: number }) => {
  const [selected, setSelected] = useState([
    {
      color: 'Red',
      size: 'L',
      state: false,
    },
    {
      color: 'Red',
      size: 'XL',
      state: false,
    },
    {
      color: 'Blue',
      size: 'L',
      state: false,
    },
    {
      color: 'Blue',
      size: 'XL',
      state: false,
    },
    {
      color: 'Yellow',
      size: 'L',
      state: false,
    },
    {
      color: 'Yellow',
      size: 'XL',
      state: false,
    },
  ]);
  return (
    <Dialog>
      <Popover content={<Label>Manage product Converse</Label>}>
        <DialogTrigger
          asChild
          className="cursor-pointer border border-input rounded-lg w-16 h-8 p-1"
        >
          <Boxes />
        </DialogTrigger>
      </Popover>
      <DialogContent className="min-w-[80vw]">
        <DialogHeader>
          <DialogTitle>Manage Stocks Adidas</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="request">
          <TabsList>
            <TabsTrigger value="request">
              <div className="flex gap-4 justify-center items-center">
                <p>Request</p>
                <Import className="h-full" />
              </div>
            </TabsTrigger>
            <Popover content={<Label>You are not a super admin!</Label>}>
              <TabsTrigger
                className="disabled:pointer-events-auto"
                value="add"
                disabled
              >
                <div className="flex gap-4 justify-center items-center">
                  <p>Add</p>
                  <SquarePlus />
                </div>
              </TabsTrigger>
            </Popover>
          </TabsList>
          <TabsContent value="request">
            <div>
              <Select
                placeholder="select variants"
                options={selected.map((item) => ({
                  label: item.color + item.size,
                  value: item,
                }))}
                dropdownRender={(menu) => <>{menu}</>}
              />
            </div>
          </TabsContent>
          <TabsContent value="add">
            <Label>Add</Label>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          <Button>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogStock;
