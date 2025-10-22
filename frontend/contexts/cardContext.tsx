import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCategoriesWithCards} from 'actions/categories';
import {updateCards} from 'redux/features/card_array/card_array';
import {RootState} from 'redux/app/store';
import {ICardType} from 'types/card';
import NetInfo from '@react-native-community/netinfo';

interface CardContextType {
  categories: ICardType[];
  isLoading: boolean;
  error: string | null;
  refreshCategories: () => Promise<void>;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

interface CardProviderProps {
  children: ReactNode;
}

export const CardProvider: React.FC<CardProviderProps> = ({children}) => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.reducer.cardArray.cardArray,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [networkConnected, setNetworkConnected] = useState<boolean>(false);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getCategoriesWithCards();

      const newData = data.filter(category => category.title === 'Brands');

      if (data && data.length > 0) {
        dispatch(updateCards(data));
      } else {
        console.warn('No categories found in Supabase');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch categories';
      console.error('Error fetching categories:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    const checkConnection = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        setNetworkConnected(state.isConnected);
      }
    });
    checkConnection();
  });

  const refreshCategories = useCallback(async () => {
    if (networkConnected) {
      await fetchCategories();
    }
  }, [fetchCategories, networkConnected]);

  // Fetch categories on mount
  useEffect(() => {
    if (networkConnected) {
      fetchCategories();
    }
  }, [fetchCategories, networkConnected]);

  const value: CardContextType = {
    categories,
    isLoading,
    error,
    refreshCategories,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

// Custom hook to use the CardContext
export const useCards = (): CardContextType => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error('useCards must be used within a CardProvider');
  }
  return context;
};
