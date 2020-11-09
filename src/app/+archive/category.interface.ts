import { Article } from '../+article/article.interface';

export interface CategoryItem {
  path: string;
  categoryName: string;
}

export interface CategoryData extends CategoryItem {
  articles: Article[];
}
