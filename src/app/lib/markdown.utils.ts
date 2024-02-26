export interface MarkdownHeading {
  title: string;
  subtitle: string;
  date: string;
  tags: string[];
  img: string;
  slug: string;
}
export function getMarkdownHeading(markdown: string): MarkdownHeading {
  const getHeadingProperty = (heading: string, property: string): string => {
    const regex = new RegExp(`${property}:(.*?);`);
    return regex.test(heading) ? regex.exec(heading)![1].trim() : '';
  }

  const heading = markdown.replace('---', '').split('---')[0];
  return {
    title: getHeadingProperty(heading, 'title'),
    subtitle: getHeadingProperty(heading, 'subtitle'),
    date: getHeadingProperty(heading, 'date'),
    tags: getHeadingProperty(heading, 'tags').split(','),
    img: getHeadingProperty(heading, 'img'),
    slug: '',
  }
}
export function getMarkdownBody(markdown: string): string {
  return markdown.replace('---', '').split('---')[1];
}