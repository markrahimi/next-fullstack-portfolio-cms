export interface PageView {
  page: string;
  count: number;
}

export interface ViewsData {
  totalViews: number;
  pages: PageView[];
}

export interface Stats {
  projects: number;
  blogs: number;
  messages: number;
  totalViews: number;
}
