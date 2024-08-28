import { v4 as uuidv4 } from 'uuid';

export const categories = [
    { id: uuidv4(), name: 'Electronics' },
    { id: uuidv4(), name: 'Books' },
    { id: uuidv4(), name: 'smartphone' },
    { id: uuidv4(), name: 'monitor' },
    { id: uuidv4(), name: 'keyboard' },
    { id: uuidv4(), name: 'mouse' },
];

const newProducts = [
    {
        name: "Iphone 15",
        description: "The best smartphone in the world",
        price: 199.99,
        stock: 12,
        category: "smartphone"
    },
    {
        name: "Samsung Galaxy S23",
        description: "The best smartphone in the world",
        price: 150.0,
        stock: 12,
        category: "smartphone"
    },
    {
        name: "Motorola Edge 40",
        description: "The best smartphone in the world",
        price: 179.89,
        stock: 12,
        category: "smartphone"
    },
    {
        name: "Samsung Odyssey G9",
        description: "The best monitor in the world",
        price: 299.99,
        stock: 12,
        category: "monitor"
    },
    {
        name: "LG UltraGear",
        description: "The best monitor in the world",
        price: 199.99,
        stock: 12,
        category: "monitor"
    },
    {
        name: "Acer Predator",
        description: "The best monitor in the world",
        price: 150.0,
        stock: 12,
        category: "monitor"
    },
    {
        name: "Razer BlackWidow V3",
        description: "The best keyboard in the world",
        price: 99.99,
        stock: 12,
        category: "keyboard"
    },
    {
        name: "Corsair K70",
        description: "The best keyboard in the world",
        price: 79.99,
        stock: 12,
        category: "keyboard"
    },
    {
        name: "Logitech G Pro",
        description: "The best keyboard in the world",
        price: 59.99,
        stock: 12,
        category: "keyboard"
    },
    {
        name: "Razer Viper",
        description: "The best mouse in the world",
        price: 49.99,
        stock: 12,
        category: "mouse"
    },
    {
        name: "Logitech G502 Pro",
        description: "The best mouse in the world",
        price: 39.99,
        stock: 12,
        category: "mouse"
    },
    {
        name: "SteelSeries Rival 3",
        description: "The best mouse in the world",
        price: 29.99,
        stock: 12,
        category: "mouse"
    }
];
const categoryMap = categories.reduce((map, category) => {
    map[category.name] = category.id;
    return map;
}, {});

export const products = newProducts.map(product => ({
    id: uuidv4(),
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    imgUrl: `${product.name.toLowerCase().replace(/ /g, '_')}.jpg`, // Asigna una URL de imagen basada en el nombre del producto
    categoryId: categoryMap[product.category],
}));

