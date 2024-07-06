'use client';

import { useGetCategories } from '@/hooks/categories/useGetCategories';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

/** Filtering products component
 * @description Komponent untuk filtering category , size.sudah memiliki hooks get categories jadi bisa langsung pakai handle yang tersedia
 * @prop handleCategories hooks untuk menghandle perubahan categories
 * @prop handleSize hooks untuk menghandle perubahan size
 * @prop sizeValue untuk memasukkan value size.by default S , M , L , XL , XXL
 */
const FilterProducts = ({
  handleCategories,
  handleSize,
  handleColor,
  sizeValue,
  colorValue,
}: {
  /** Param HandleCategories
   * @description Hooks untuk menghandle perubahan categories
   * @example (value) => console.log(value)
   * @returns Sebuah function dengan params string array : ['categories1' , 'categories2']
   */
  handleCategories: (val: string[]) => void;
  /** Param HandleSize
   * @description Hooks untuk menghandle perubahan size
   * @example (value) => console.log(value)
   * @returns Sebuah function dengan params string array : ['size1' , 'size2']
   */
  handleSize: (val: string[]) => void;
  /**
   *
   */
  handleColor: (val: string[]) => void;
  /** Param size value
   * @description by default ['S','M','L','XL','XXL']
   * @param val input props ini harus string array. ex : ['kecil','tanggung','besar']
   */
  sizeValue?: string[];
  /**
   *
   */
  colorValue?: string[];
}) => {
  const { data } = useGetCategories();
  const [filter, setFilter] = useState<any>([]);
  const [color, setColor] = useState(
    colorValue
      ? new Map(colorValue.map((val, indx) => [val, false]))
      : new Map([
          ['Red', false],
          ['Blue', false],
          ['Indigo', false],
          ['Brown', false],
          ['Purple', false],
        ]),
  );

  const [size, setSize] = useState(
    sizeValue
      ? new Map(sizeValue.map((val, indx) => [val, false]))
      : new Map([
          ['S', false],
          ['M', false],
          ['L', false],
          ['XL', false],
          ['XXL', false],
        ]),
  );

  useEffect(() => {
    setFilter({
      ...data.reduce((prev, val) => {
        return { ...prev, [val.name]: false };
      }, {}),
    });
  }, [data]);

  useEffect(() => {
    handleCategories([
      ...Object.entries(filter).reduce((prev: any, [key, value], indx, arr) => {
        if (value) {
          return [...prev, key];
        } else return [...prev];
      }, []),
    ]);
  }, [filter]);

  useEffect(() => {
    handleSize(
      [...size.keys()].reduce((prev: string[], curr) => {
        if (size.get(curr)) {
          return [...prev, curr];
        } else return [...prev];
      }, []),
    );
  }, [size]);

  useEffect(() => {
    handleColor(
      [...color.keys()].reduce((prev: string[], curr) => {
        if (color.get(curr)) {
          return [...prev, curr];
        } else return [...prev];
      }, []),
    );
  }, [color]);

  const handleSelectCategories = (value: string, bool: boolean) => {
    setFilter({ ...filter, [value]: bool });
  };

  return (
    <div className="p-4 rounded-lg w-64">
      <h2 className="text-lg font-semibold mb-4 font-rubik">Filters</h2>
      <div id="filter-size" className="mb-4">
        <h3 id="filter-title-size" className="font-semibold font-rubik mb-2">
          SIZE
        </h3>
        <div
          id="filter-title-select"
          className="grid grid-cols-4 gap-2 text-xs"
        >
          {[...size.keys()].map((key, indx) => {
            return (
              <div key={indx}>
                <button
                  onClick={() => {
                    setSize(new Map(size.set(key, !size.get(key))));
                  }}
                  className={`w-10 h-10 font-bold font-rubik ${size.get(key) ? 'bg-black text-white' : 'bg-white text-black '} p-2 rounded`}
                >
                  {key}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div id="filter-color" className="mb-4">
        <h3 id="filter-color-title" className="font-semibold font-rubik mb-2">
          COLOR
        </h3>
        <div id="filter-color-select" className="grid grid-cols-5 gap-2">
          {[...color.keys()].map((key, indx) => {
            return (
              <div key={indx}>
                <div
                  onClick={() => {
                    setColor(new Map(color.set(key, !color.get(key))));
                  }}
                  style={{ backgroundColor: key }}
                  className="w-8 h-8 rounded cursor-pointer flex justify-center items-center"
                >
                  {color.get(key) ? (
                    <Check className="text-white" width={20} height={20} />
                  ) : (
                    ''
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div id="filter-category" className="mb-4">
        <h3
          id="filter-category-title"
          className="font-semibold font-rubik mb-2"
        >
          CATEGORIES
        </h3>
        <div id="filter-category-select">
          {data?.map((val) => {
            return (
              <div key={'category-' + val.name}>
                <label className="flex items-center mb-1">
                  <div
                    onClick={() =>
                      handleSelectCategories(val.name, !filter[val.name])
                    }
                    className="w-[14px] h-[14px] rounded-[2px] cursor-pointer flex justify-center items-center border border-black"
                  >
                    {filter[val.name] ? (
                      <>
                        <Check />
                      </>
                    ) : undefined}
                  </div>
                  {/* <input
                    defaultValue={0}
                    onChange={(e) =>
                      handleSelectCategories(val.name, e.currentTarget.checked)
                    }
                    type="checkbox"
                    className="form-checkbox"
                  /> */}
                  <span className="ml-2 font-openSans text-sm font-semibold">
                    {val.name}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div id="filter-price" className="mb-4">
        <h3 id="filter-price-title" className="font-semibold font-rubik mb-2">
          PRICE
        </h3>
        <div id="filter-price-select">
          <input
            onChange={(e) => console.log(e.currentTarget.value)}
            type="range"
            min="0"
            max="1000"
            className="w-full h-1 mb-6 rounded-full bg-black appearance-none cursor-pointer [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:rounded-full "
          />
          <div className="flex justify-between font-openSans text-sm">
            <span>$0</span>
            <span>$1000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;
