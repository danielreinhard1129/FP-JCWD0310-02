'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';

interface PaginationComponentProps {
  /** State take */
  take: number;

  /** State page */
  page: number;

  /** Handler setquery */
  setQuery: any;

  /** Query yang berasal dari state hooks */
  query: any;

  /** count (jumlah data yang ada di database,untuk memberikan max pagination) */
  count: number | 0;
}

/** Komponen untuk membuat pagination button, memberikan output button sebelumnya ( previous ) dan seterusnya ( next ),komponen juga sudah include index indicator
 */
const PaginationPage = (props: PaginationComponentProps) => {
  const handlePrevPage = () => {
    if (props.page >= 2) {
      props.setQuery({
        ...props.query,
        page: props.page - 1,
      });
    }
  };
  const handleNextPage = () => {
    if (
      props.page !== Math.ceil(props.count / props.take) &&
      Math.ceil(props.count / props.take)
    ) {
      props.setQuery({
        ...props.query,
        page: props.page + 1,
      });
    }
  };
  return (
    <>
      <div
        id="pagination-page"
        className="flex w-full justify-center mt-8 mb-16 gap-3"
      >
        <div
          id="prev-page"
          onClick={handlePrevPage}
          className="rounded-lg border cursor-pointer border-black w-24 h-6 px-2 flex justify-between items-center"
        >
          <ArrowLeft width={10} />
          <p className="text-sm h-full">Previous</p>
        </div>
        {props.page > 1 ? (
          <>
            <div
              id="select-prev-page-active"
              className="rounded-lg border bg-white text-black w-6 h-6 text-center flex justify-center items-center"
            >
              <div className="text-sm">{props.page - 1}</div>
            </div>
          </>
        ) : (
          <></>
        )}
        <div
          id="select-current-page-active"
          className="rounded-lg bg-black text-white w-6 h-6 text-center flex justify-center items-center"
        >
          <div className="text-sm">{props.page}</div>
        </div>
        {props.page == Math.ceil(props.count / props.take) ? (
          ''
        ) : Number(props.count / props.take) > 1 ? (
          <>
            <div
              id="select-next-page-active"
              className="rounded-lg border bg-white text-black w-6 h-6 text-center flex justify-center items-center"
            >
              <div className="text-sm">
                {Math.ceil(props.count / props.take)}
              </div>
            </div>
          </>
        ) : (
          ''
        )}
        <div
          id="next-page"
          onClick={handleNextPage}
          className="rounded-lg border cursor-pointer border-black w-24 h-6 px-2 flex justify-between items-center"
        >
          <p className="text-sm h-full">Next</p>
          <ArrowRight width={10} />
        </div>
      </div>
    </>
  );
};

export default PaginationPage;
