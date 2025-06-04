/**
 * 博客文章元数据类型
 */
export interface Post {
  /** 文章标题 */
  title: string;
  /** 发布日期 */
  date: string;
  /** 文章描述/摘要 */
  desc: string;
  /** 文章ID/slug */
  id: string;
}
