import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeBlogPostFields {
  title: EntryFieldTypes.Symbol;
  slug?: EntryFieldTypes.Symbol;
  introduction: EntryFieldTypes.RichText;
  firstSection: EntryFieldTypes.RichText;
  secondSection: EntryFieldTypes.RichText;
  thirdSection?: EntryFieldTypes.Text;
  conclusion: EntryFieldTypes.RichText;
  callToAction: EntryFieldTypes.RichText;
}

export type TypeBlogPostSkeleton = EntrySkeletonType<
  TypeBlogPostFields,
  "blogPost"
>;
export type TypeBlogPost<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<TypeBlogPostSkeleton, Modifiers, Locales>;
