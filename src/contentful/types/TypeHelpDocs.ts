import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeHelpDocsFields {
  title: EntryFieldTypes.Symbol;
  helpArticleBody: EntryFieldTypes.RichText;
}

export type TypeHelpDocsSkeleton = EntrySkeletonType<
  TypeHelpDocsFields,
  "helpDocs"
>;
export type TypeHelpDocs<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<TypeHelpDocsSkeleton, Modifiers, Locales>;
