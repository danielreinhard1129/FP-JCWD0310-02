'use client';
import { notification } from 'antd';
import { AxiosResponse } from 'axios';
import { ReactNode } from 'react';
import {
  NotificationDescription,
  NotificationMessages,
  NotificationCloseIcon,
  NotificationOpenIcon,
} from '../components/Notification';

/** Example using for this hooks
 *
 *  const { openNotification , contextHolder } = useNotification();
 *
 *  const { ... } = useFormik ({
 *      ... ,
 *      onSumbit : (values) => {
 *      openNotification.async( postProduct(values) , console.log('success value') , console.log('reject value') );
 *      },
 *  })
 *
 *  return (
 *  <>
 *      <div>
 *      { contextHolder }
 *         <Button onClick={()=> handleSubmit()}> Submit </Button>
 *         ....
 *      </div>
 *  </>
 * )
 */

export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = {
    open: api.open,
    warning: api.warning,
    error: api.error,
    info: api.info,
    success: api.success,
    async: (
      asyncFunc: Promise<AxiosResponse<any, any>>,
      successFunc?: () => void,
      rejectFunc?: () => void,
    ) => {
      asyncFunc
        .then((success) => {
          api.success({
            message: 'Success!',
            description:
              success.data &&
              success.data.message &&
              typeof success.data?.message == 'string'
                ? success.data.message
                : undefined,
          });
          return successFunc && successFunc();
        })
        .catch((error) => {
          api.error({
            message: 'Something is error!',
            description:
              error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
          return rejectFunc && rejectFunc();
        });
    },
  };

  return { contextHolder, openNotification };
};
