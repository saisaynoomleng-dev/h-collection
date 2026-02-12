import { BiCategory } from 'react-icons/bi';
import { BsNewspaper } from 'react-icons/bs';
import { FaUserEdit } from 'react-icons/fa';
import { IoIosColorPalette, IoIosResize, IoIosShirt } from 'react-icons/io';
import { IoPencilSharp } from 'react-icons/io5';
import { MdOutlineQuestionMark } from 'react-icons/md';
import { SiNike } from 'react-icons/si';
import { TiDocumentText } from 'react-icons/ti';
import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('H Collection')
    .items([
      S.divider().title('Contents'),
      S.documentTypeListItem('productCategory')
        .title('Product Categories')
        .icon(BiCategory),
      S.documentTypeListItem('productColor')
        .title('Product Colors')
        .icon(IoIosColorPalette),
      S.documentTypeListItem('productSize')
        .title('Product Sizes')
        .icon(IoIosResize),
      S.documentTypeListItem('productBrand')
        .title('Product Brands')
        .icon(SiNike),
      S.documentTypeListItem('product').title('Products').icon(IoIosShirt),
      S.documentTypeListItem('teamMember')
        .title('Team Members')
        .icon(FaUserEdit),
      S.documentTypeListItem('faq').title('FAQs').icon(MdOutlineQuestionMark),
      S.documentTypeListItem('utilityPage')
        .title('Utility Pages')
        .icon(TiDocumentText),

      S.divider().title('Marketing'),
      S.documentTypeListItem('blogCategory')
        .title('Blog Categories')
        .icon(BiCategory),
      S.documentTypeListItem('author').title('Authors').icon(IoPencilSharp),
      S.documentTypeListItem('blog').title('Blogs').icon(BsNewspaper),
    ]);
