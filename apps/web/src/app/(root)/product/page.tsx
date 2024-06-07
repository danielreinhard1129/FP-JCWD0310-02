import React from 'react';

const ProductsPage = () => {
  return (
    <>
      <div className="py-4 w-full flex flex-col gap-8">
        <div className="flex justify-center">
          <h1 className="text-3xl font-medium">Jaket Kulit</h1>
        </div>
        <div className="flex gap-4">
          <p className="text-muted-foreground">Categories</p>
          <p>/</p>
          <p>Jackets</p>
        </div>
        <div id="content" className="flex justify-between">
          <div className="w-[600px] flex flex-col gap-10">
            <div
              id="image"
              className="w-[600px] h-[400px] rounded-[40px] bg-gray-500"
            ></div>
            <div>
              <Label>About Jaket Kulit</Label>
              <p className="text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
                consequuntur rerum placeat sed quo dolore, atque autem quisquam
                praesentium veritatis sunt quidem, totam odio saepe quos minima
                nostrum facere inventore.
              </p>
            </div>
          </div>
          {/* <div
            id="checkout"
            className=""
          > */}
          <Card
            id="checkout"
            className="p-6 shadow-none w-[400px] h-[400px] rounded-lg border border-gray-200"
          >
            <CardHeader>
              <CardTitle>Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-8">
                <Label className="text-green-500 text-3xl">Rp.75.000</Label>

                <div>
                  <Label>How many do you wants?</Label>
                  <div className="mt-2 w-full h-10 flex justify-between items-center rounded-md bg-gray-200">
                    <div
                      onClick={() => console.log('plus')}
                      className="w-10 h-10 bg-green-500 rounded-md flex items-center justify-center cursor-pointer"
                    >
                      <Plus color="white" />
                    </div>
                    <p>5</p>
                    <div
                      onClick={() => console.log('minus')}
                      className="w-10 h-10 bg-red-500 rounded-md flex items-center justify-center cursor-pointer"
                    >
                      <Minus color="white" />
                    </div>
                  </div>
                </div>

                <Label className="flex gap-1">
                  You will pay <p className="font-bold">Rp 75.000</p> per{' '}
                  <p className="font-bold">2 item</p>
                </Label>

                <Button className="bg-blue-500 w-full">
                  Continue to Chart
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
