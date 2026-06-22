import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SelectorScreen } from '../screens/SelectorScreen';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { getCategoryBySlug, getCategorySlug } from '../themes/categories';

export function SelectorPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const categorySlug = searchParams.get('category') ?? '';
  const category = categorySlug ? getCategoryBySlug(categorySlug) : null;
  const [heroSearchVisible, setHeroSearchVisible] = useState(true);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          const trimmed = value.trim();
          if (trimmed) next.set('search', trimmed);
          else next.delete('search');
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const handleCategoryChange = useCallback(
    (provider: string | null) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (provider) next.set('category', getCategorySlug(provider));
          else next.delete('category');
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  return (
    <>
      <Header
        showStickySearch={!heroSearchVisible}
        search={search}
        onSearchChange={handleSearchChange}
      />
      <SelectorScreen
        search={search}
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        onHeroSearchVisibleChange={setHeroSearchVisible}
      />
      <Footer />
    </>
  );
}
