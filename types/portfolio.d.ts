/**
 * ═════════════════════════════════════════════════════════════════════
 * COSTAR SUITE · CONTRATOS DE TIPAGEM ESTÁTICA TYPESCRIPT
 * Tipos e interfaces estritas para o ecossistema pvdukdev
 * ═════════════════════════════════════════════════════════════════════
 */

export interface BlogPost {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly date: string;
  readonly readTime: string;
  readonly file: string;
  readonly tags: readonly string[];
  readonly published: boolean;
  readonly seriesId?: string;
  readonly seriesOrder?: number;
}

export interface SeriesConfig {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly totalPosts: number;
}

export interface PostsManifest {
  readonly series: readonly SeriesConfig[];
  readonly posts: readonly BlogPost[];
}

export interface CommandContext {
  readonly rawInput: string;
  readonly args: readonly string[];
  output(text: string, isError?: boolean): void;
  clear(): void;
}

export interface TerminalCommand {
  readonly name: string;
  readonly description: string;
  readonly aliases?: readonly string[];
  execute(ctx: CommandContext): void | Promise<void>;
}

export type I18nDictionary = Record<string, string>;

export type ThemeMode = 'dark' | 'light';

export type ViewMode = 'standard' | 'dev';
