import {supabase} from 'utils/supabase';
import {ICardType} from 'types/card';

export async function getCategoriesWithCards(): Promise<ICardType[]> {
  try {
    const {data: categories, error: categoriesError} = await supabase
      .from('categories')
      .select('*')
      .order('title');

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
      throw new Error(`Failed to fetch categories: ${categoriesError.message}`);
    }

    if (!categories || categories.length === 0) {
      console.warn('No categories found');
      return [];
    }

    const {data: cards, error: cardsError} = await supabase
      .from('cards')
      .select('*')
      .in(
        'category_id',
        categories.map(cat => cat.id),
      );

    if (cardsError) {
      console.error('Error fetching cards:', cardsError);
      throw new Error(`Failed to fetch cards: ${cardsError.message}`);
    }

    const cardsByCategory = (cards || []).reduce((acc, card) => {
      if (!acc[card.category_id]) {
        acc[card.category_id] = [];
      }
      acc[card.category_id].push(card.content);
      return acc;
    }, {} as Record<string, string[]>);

    const result: ICardType[] = categories.map(category => ({
      title: category.title,
      icon: category.icon,
      favourite: category.favourite,
      color: category.color,
      isNew: category.isNew,
      description: category.description,
      cards: cardsByCategory[category.id] || [],
    }));

    return result;
  } catch (error) {
    console.error('Error in getCategoriesWithCards:', error);
    throw error;
  }
}
