

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice';
import ProductFilter from '@/components/shopping-view/filter';
import ShoppingProductTile from '@/components/shopping-view/product-tile';

import { Button } from '@/components/ui/button';
import { sortOptions } from '@/config';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ArrowUpDownIcon, Star } from 'lucide-react';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import ProductDetail from '@/components/shopping-view/productDetailsmodel';
import ProductDetailDialog from '@/components/shopping-view/productDetailsmodel';


 function ShoppingListing() {
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState('price-lowtohigh');
    const [selectedProductId, setSelectedProductId] = useState(null);
    
 const [isDialogOpen, setDialogOpen] = useState(false);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const productList = useSelector(state => state.shopProducts.productList);
    console.log("productslisstttttt,",productList);
    console.log(";length",productList.length);
    const selectedProduct = useSelector(state => state.shopProducts.selectedProduct); // Access selectedProduct correctly
    const categorySearchParam = searchParams.get("category");

    useEffect(() => {
        if (selectedProduct) {
            console.log('Selected Product:', selectedProduct);
            setDialogOpen(true);
        }
    }, [selectedProduct]);

    useEffect(() => {
        if (selectedProductId) {
            console.log(`Fetching details for product ID: ${selectedProductId}`);
            dispatch(fetchProductDetails(selectedProductId));
        }
    }, [selectedProductId, dispatch]);

    function handleSort(value) {
        setSort(value);
    }

    function createSearchParamsHelper(filterParams) {
        const queryParams = [];
        for (const [key, value] of Object.entries(filterParams)) {
            if (Array.isArray(value) && value.length > 0) {
                const paramValue = value.join(',');
                queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
            }
        }
        return queryParams.join("&");
    }

    function handleGetProductDetails(productItem) {
        setSelectedProductId(productItem._id); // Update state to trigger product detail fetch
        console.log(`Initiating fetch for product ID: ${productItem._id}`);
     
        setDialogOpen(true);
    };
    useEffect(() => {
      setSort("price-lowtohigh");
      setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
    }, [categorySearchParam]);
  
    function handleFilter(getSectionId, getCurrentOption) {
      let cpyFilters = { ...filters };
      const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
  
      if (indexOfCurrentSection === -1) {
        cpyFilters = {
          ...cpyFilters,
          [getSectionId]: [getCurrentOption],
        };
      } else {
        const indexOfCurrentOption =
          cpyFilters[getSectionId].indexOf(getCurrentOption);
  
        if (indexOfCurrentOption === -1)
          cpyFilters[getSectionId].push(getCurrentOption);
        else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
  
      setFilters(cpyFilters);
      sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
    };


  const handleCloseDialog = () => {
      setDialogOpen(false);
      setSelectedProductId(null);
    };
    useEffect(() => {
      if (filters && Object.keys(filters).length > 0) {
        const createQueryString = createSearchParamsHelper(filters);
        setSearchParams(new URLSearchParams(createQueryString));
      }
    }, [filters]);
  
    useEffect(() => {
      if (filters !== null && sort !== null)
        dispatch(
          fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
        );
    }, [dispatch, sort, filters]);
  

    return (
        <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6'>
            <ProductFilter filters={filters} handleFilter={handleFilter} />
            <div className='bg-background w-full rounded-lg shadow-sm'>
                <div className='p-4 border-b gap-3 flex items-center justify-between'>
                    <h2 className='text-lg font-semibold'>All products</h2>
                    <div className='flex items-center'>
                        <span className='text-muted-foreground mr-2'>{productList.length} products</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center gap-3">
                                    <ArrowUpDownIcon className='h-4 w-4' />
                                    <span>Sort by</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className='w-[200px] relative bg-white z-20 shadow-lg md:mt-5 px-4 py-4'>
                                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort} className=''>
                                    {sortOptions.map(sortItem =>
                                        <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id} className='flex flex-row items-center gap-2 px-2 mb-2'>
                                            {sortItem.label}
                                        </DropdownMenuRadioItem>
                                    )}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {productList && productList.length > 0 ? 
                        productList.map(productItem =>
                            <ShoppingProductTile
                                key={productItem._id}
                                product={productItem}
                                handleGetProductDetails={() => handleGetProductDetails(productItem)}
                            />
                        ) : null
                    }
                </div>
            </div>
            <ProductDetailDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        product={selectedProduct}
      />

        </div>
    );
}
export default ShoppingListing;