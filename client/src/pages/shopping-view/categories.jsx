// categories.js
import { Baby, Bitcoin, Boxes, Codepen, Flower, Footprints, Framer, HeartHandshake, MemoryStick, MessageCircleHeart, Shirt, ShoppingCartIcon, Watch } from 'lucide-react';

const categories = [
  {
    id:"men",
    name: 'Men',
    icon: <Shirt></Shirt>,
  },
  {
    id:"women",
    name: 'Women',
    icon: <MessageCircleHeart></MessageCircleHeart>,
  },
  {
    id:"kids",
    name: 'Kids',
    icon:<Baby></Baby>,
  },
  {
    id:"accessories",
    name: 'Accessories',
    icon: <Watch></Watch>,
  },
  {
    id:"footwear",
    name: 'Footwear',
    icon: <Footprints></Footprints>,
  },
];
const brands = [
  { id: "nike", label: "Nike", icon:<Boxes></Boxes> },
  { id: "adidas", label: "Adidas", icon: <ShoppingCartIcon></ShoppingCartIcon> },
  { id: "puma", label: "Puma", icon: <Bitcoin></Bitcoin> },
  { id: "levi", label: "Levi's", icon: <Flower></Flower>},
  { id: "zara", label: "Zara", icon:<HeartHandshake></HeartHandshake> },
  { id: "h&m", label: "H&M", icon: <MemoryStick></MemoryStick> },
];

export { categories, brands };