import {Button} from "@/components/ui/button.js";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select.js";
import {Card, CardContent} from "@/components/ui/card.js";
import {Input} from "@/components/ui/input.js";
import {getProducts} from "../../../services/api.js";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export const Products =( ) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts().then((data) => setProducts(data.products));
    }, []);


    return(
        <div className='p-4 max-w-7xl mx-auto'>
            <div className='flex gap-4'>
                <Input placeholder="Поиск..." />
                <Select>
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
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {products.map((item) => (
                    <Card>
                        <CardContent className='mt-4'>
                            <img src={item.thumbnail} alt={item.title} className="h-40 w-full object-contain rounded-lg"/>
                            <h2 className="mt-2 font-bold text-[22px]">{item.title}</h2>
                            <p className="text-sm text-gray-500">
                                {item.category}
                            </p>
                            <p className="mt-1 font-semibold">
                                ${item.price}
                            </p>
                            <Link to={`/products/${item.id}`}>
                                <Button className='cursor-pointer mt-4 w-full'>
                                    Подробнее
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
