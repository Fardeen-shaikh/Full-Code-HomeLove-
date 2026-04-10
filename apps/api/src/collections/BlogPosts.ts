import type { CollectionConfig } from 'payload'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
  },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'content', type: 'richText', required: true },
    { name: 'featuredImage', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Home Tips', value: 'home-tips' },
        { label: 'Trends & Ideas', value: 'trends-ideas' },
        { label: 'Buying Guide', value: 'buying-guide' },
        { label: 'Renovation', value: 'renovation' },
        { label: 'Interior Design', value: 'interior-design' },
        { label: 'Smart Home', value: 'smart-home' },
      ],
    },
    { name: 'author', type: 'text' },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
