import { Button } from "@/components/ui/button.js";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select.js";
import { Card, CardContent } from "@/components/ui/card.js";
import { Input } from "@/components/ui/input.js";
import { getProducts } from "../../../services/api.js";
import { useEffect, useState } from "react";
import {
  searchProducts,
  getProductsByCategory,
  getCategories,
} from "../../../services/api.js";
import { Link } from "react-router-dom";
import Header from "@/pages/OurComponents/Header.jsx";
import Footer from "@/pages/OurComponents/Footer.jsx";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);
  useEffect(() => {
    loadProducts();
  }, [searchQuery, selectedCategory]);

  const loadProducts = async () => {
    setIsLoading(true); // Показываем индикатор загрузки

    try {
      let data;

      if (searchQuery.trim()) {
        // Если есть поисковый запрос — ищем товары
        data = await searchProducts(searchQuery);
      } else if (selectedCategory !== "all") {
        // Если выбрана категория — загружаем товары по категории
        data = await getProductsByCategory(selectedCategory);
      } else {
        // Иначе загружаем все товары
        data = await getProducts();
      }

      setProducts(data.products); // Сохраняем товары в стейт
    } catch (error) {
      console.error("Ошибка загрузки товаров:", error);
    } finally {
      setIsLoading(false); // Скрываем индикатор загрузки
    }
  };

  const loadCategories = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData); // Сохраняем категории в стейт
    } catch (error) {
      console.error("Ошибка загрузки категорий:", error);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Header />
      <div className="flex gap-4">
        <Input
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={isLoading}
        />
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите категорию" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все</SelectItem>
            <SelectItem value="smartphones">Смартфоны</SelectItem>
            <SelectItem value="laptops">Ноутбуки</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {products.map((item) => (
            <Card key={item.id}>
              <CardContent className="mt-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-40 w-full object-contain rounded-lg"
                />
                <h2 className="mt-2 font-bold text-[22px]">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="mt-1 font-semibold">${item.price}</p>
                <Link to={`/products/${item.id}`}>
                  <Button className="cursor-pointer mt-4 w-full">
                    Подробнее
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};
