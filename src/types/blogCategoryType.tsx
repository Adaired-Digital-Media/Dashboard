export type BlogCategoryTypes = {
    _id: string;
    parentCategory: string;
    subCategories: { categoryId: string }[];
    categoryName: string;
    categorySlug: string;
    status: string;
    blogs: { blogId: string }[];
  };
  