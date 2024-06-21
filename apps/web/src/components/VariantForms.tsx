import { Variant } from '@/types/product.type';
import { FC } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface VariantFormProps {
  id: string;
  name: string;
  values: Pick<Variant, 'color' | 'size'>[];
  handleChange: (values: Pick<Variant, 'color' | 'size'>[]) => void;
}

export const VariantForms: FC<VariantFormProps> = ({
  handleChange,
  id,
  name,
  values,
}) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <Button
          onClick={() => handleChange([...values, { color: '', size: '' }])}
        >
          Add Variant
        </Button>
        {values.map((val, indx) => {
          return (
            <div key={indx} className="flex w-full gap-4">
              <div className="flex items-center gap-4">
                <p>Color</p>
                <Input
                  value={val.color}
                  onChange={(e) =>
                    handleChange(
                      values.map((val, index) => {
                        if (index == indx) {
                          return {
                            color: e.currentTarget.value,
                            size: val.size,
                          };
                        } else return val;
                      }),
                    )
                  }
                />
              </div>
              <div className="flex items-center gap-4">
                <p>Size</p>
                <Input
                  value={val.size}
                  onChange={(e) =>
                    handleChange(
                      values.map((val, index) => {
                        if (index == indx) {
                          return {
                            size: e.currentTarget.value,
                            color: val.color,
                          };
                        } else return val;
                      }),
                    )
                  }
                />
              </div>
              <Button
                onClick={() =>
                  handleChange(values.filter((val, index) => index != indx))
                }
              >
                Delete
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
};
