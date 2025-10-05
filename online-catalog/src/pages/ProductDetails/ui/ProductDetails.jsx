import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card.js";
import { useEffect, useState } from "react";
import { getProductById, getProductsByCategory } from "@/services/api.js";
import { Button } from "@/components/ui/button.js";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Header from "@/pages/OurComponents/Header.jsx";
import Footer from "@/pages/OurComponents/Footer.jsx";

export const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const params = useParams();
  const productId = params.id;

  useEffect(() => {
    getProductById(productId).then(setProduct);
  }, [productId]);

  useEffect(() => {
    if (product?.category) {
      getProductsByCategory(product.category).then((data) => {
        const productsArray = Array.isArray(data) ? data : data.products || [];
        const filtered = productsArray.filter(
          (item) => item.id !== Number(productId),
        );
        setRelatedProducts(filtered);
      });
    }
  }, [product, productId]);

  if (!product)
    return (
      <div className="flex items-center justify-center h-screen flex-col">
        <div className="p-1">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
        <div className="font-medium text-[16px]">Идет загрузка</div>
      </div>
    );

  return (
    <div>
      <div className="p-4 max-w-7xl mx-auto">
        <Header />
        <Card>
          <CardContent>
            <div className="flex items-center">
              <div>
                <img
                  className="w-auto h-auto object-cover"
                  src={product.thumbnail}
                  alt=""
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div className="mb-1 font-bold text-[22px]">
                    {product.title}
                  </div>
                  <div className="mb-1 font-bold text-[24px]">
                    rating: {product.rating}
                  </div>
                </div>
                <div className="mb-1 font-bold text-[20px]">
                  {product.price}$
                </div>
                <div className="mb-2 font-medium">brand: "{product.brand}"</div>
                <div className="mb-2 font-medium pb-2 border-b">
                  category: "{product.category}"
                </div>
                <div className="mb-2 font-medium">Description:</div>
                <div className="mb-2 font-medium pb-2 border-b">
                  {product.description}
                </div>
                <div>
                  <div className="mb-2 font-medium">Characteristics:</div>
                  <div className="flex font-medium">
                    depth: {product.dimensions.depth}
                  </div>
                  <div className="font-medium">
                    height: {product.dimensions.height}
                  </div>
                  <div className="font-medium">
                    width: {product.dimensions.width}
                  </div>
                </div>
                <Button className="cursor-pointer mt-4">Купить</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Слайдер похожих товаров */}
        {relatedProducts.length > 0 && (
          <div className="mt-6">
            <h2 className="font-bold text-xl mb-2">Похожие товары</h2>
            <Carousel className="w-full mx-auto">
              <CarouselContent>
                {relatedProducts.map((item) => (
                  <CarouselItem key={item.id} className="basis-1/3 p-2">
                    <Card>
                      <CardContent className="p-2 flex items-center flex-col">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-auto h-auto object-cover"
                        />
                        <div className="font-bold text-lg mt-2">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          {item.price}$
                        </div>
                        <Link to={`/products/${item.id}`}>
                          <Button className="cursor-pointer mt-4">
                            Подробнее
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};
