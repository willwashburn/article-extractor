// Type definitions

import {IOptions as SanitizeOptions} from "sanitize-html";
import "urlpattern-polyfill";

/**
 * @example
 * {
 *   patterns: [
 *     '*://example.com/books/:id', {
 *       hostname: 'example.com',
 *       pathname: '/books/:id',
 *     }
 *   ],
 *   selector: '.article-body',
 *   unwanted: ['.removing-box']
 * }
 */
export interface Transformation {
  patterns: Array<URLPatternInit | string>,
  pre?: (document: Document) => Document
  post?: (document: Document) => Document
}

/**
 * @param input url or html
 */
export function extract(input: string): Promise<ArticleData>;

export function addTransformations(transformations: Array<Transformation>): Number;

export function removeTransformations(options: Array<URLPatternInit>): Number;

export function setParserOptions(options: ParserOptions): void;

export function setSanitizeHtmlOptions(options: SanitizeOptions): void;

export function getParserOptions(): ParserOptions;

export function getSanitizeHtmlOptions(): SanitizeOptions;

export interface ParserOptions {
  /**
   * For estimating "time to read".
   * Default: 300
   */
  wordsPerMinute: number
  /**
   * To find the best url from list
   */
  urlsCompareAlgorithm: 'levenshtein' | 'cosine' | 'diceCoefficient' | 'jaccardIndex' | 'lcs' | 'mlcs'
  /**
   * Min num of chars required for description
   * Default: 40
   */
  descriptionLengthThreshold: number
  /**
   * Max num of chars generated for description
   * Default: 156
   */
  descriptionTruncateLen: number
  /**
   * Min num of chars required for content
   * Default: 200
   */
  contentLengthThreshold: number
}

export interface ArticleData {
  url?: string;
  links?: string[];
  title?: string;
  description?: string;
  image?: string;
  author?: string;
  content?: string;
  source?: string;
  published?: string;
  ttr?: number;
}