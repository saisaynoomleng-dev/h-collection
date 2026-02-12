import { type SchemaTypeDefinition } from 'sanity';
import { blockImage } from './components/blockImage';
import { blockContentType } from './components/blockContent';
import { productCategoryType } from './productCategoryType';
import { productColorType } from './productColorType';
import { productSizeType } from './productSizeType';
import { productBrandType } from './productBrandType';
import { productType } from './productType';
import { teamMemberType } from './teamMemberType';
import { faqType } from './faqType';
import { utilityPageType } from './utilityPageType';
import { blogCategoryType } from './blogCategoryType';
import { blogAuthorType } from './blogAuthorType';
import { blogType } from './blogType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockImage,
    blockContentType,
    productCategoryType,
    productColorType,
    productSizeType,
    productBrandType,
    productType,
    teamMemberType,
    faqType,
    utilityPageType,
    blogCategoryType,
    blogAuthorType,
    blogType,
  ],
};
