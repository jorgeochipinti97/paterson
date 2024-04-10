import { ProductForm } from "@/components/Forms/productForm";
import { TableGuide } from "@/components/Tables/guiaTable";
import TableOrders from "@/components/Tables/ordersTable";
import { TableProducts } from "@/components/Tables/productTable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="w-12/12 md:w-10/12 h-[80vh] p-5 bg-white rounded-xl flex justify-center">
        <Tabs defaultValue="account" className="h-[60vh] w-11/12">
          <TabsList className='flex justify-center'>
            <TabsTrigger value="account">Crear Producto</TabsTrigger>
            <TabsTrigger value="products">Productos</TabsTrigger>
            <TabsTrigger value="orders">Ordenes</TabsTrigger>
            <TabsTrigger value="guia">Guia</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <ProductForm />
          </TabsContent>
          <TabsContent value="products">
            <TableProducts />
          </TabsContent>
          <TabsContent value="orders">
            <TableOrders />
          </TabsContent>
          <TabsContent value="guia">
<TableGuide/>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
