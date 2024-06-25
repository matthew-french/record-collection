"use client"

import React, { useState, useEffect } from 'react';

import RecordComponent from '@/components/record-component';
import CollectionPaginationcomponent from '@/components/collection-pagination-component';

import DiscogResponse from "@/types/DiscogResponse";
import { DiscogRecord} from "@/types/DiscogRecord";

interface Artist {
  name: string;
  id: string;
  resourceUrl: string;
}

interface Product {
  coverImage: string;
  id: number;
  thumb: string;
  year: number;
  title: string;
  genres: string;
  artist: Artist;
  styles: string;
  masterUrl: string;
  resourceUrl: string;
  formats: string;
};

const CollectionPage: React.FC<DiscogResponse> = ({pagination, releases}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const currentPage = pagination.page;
  const totalPages = pagination.pages;

  const productsWithIndex = products.map((product, index) => ({
    ...product,
    index: index // Adding an index property
  }));

  useEffect(() => {
    // Convert releases to the desired format for products
    const newProducts: Product[] = releases.map(({ basic_information }: DiscogRecord) => ({
      coverImage: basic_information.cover_image,
      id: basic_information.id,
      thumb: basic_information.thumb,
      year: basic_information.year,
      title: basic_information.title,
      genres: basic_information.genres.join(', '),
      artist: {
        name: basic_information.artists[0].name,
        id: basic_information.artists[0].id,
        resourceUrl: basic_information.artists[0].resource_url,
      },
      styles: basic_information.styles.join(', '),
      masterUrl: basic_information.master_url,
      resourceUrl: basic_information.resource_url,
      formats: basic_information.formats.map(format => format.name).join(', '),
    }));

    setProducts(newProducts); // Update the state with the new products
  }, [currentPage, releases]); // Depend on currentPage and releases to trigger the effect

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-8 flex justify-center">
        <CollectionPaginationcomponent
          currentPage={currentPage}
          totalPages={totalPages}
          perPage={pagination.per_page}
          basePath={`/`}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* loop over products */}
        {productsWithIndex.map(product => (
          <RecordComponent key={`${product.id}-${product.index}`} {...product} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <CollectionPaginationcomponent
          currentPage={currentPage}
          totalPages={totalPages}
          perPage={pagination.per_page}
          basePath={`/`}
        />
      </div>
    </div>
  )
}

export default CollectionPage
