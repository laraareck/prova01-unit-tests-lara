/**
 * Exemplo de testes para StringUtils usando Jest.
 * Rode com: npx jest StringUtils.test.js
 */
const StringUtils = require('./StringUtils');

describe('StringUtils', () => {
  const utils = new StringUtils();

  test('capitalize', () => {
    expect(utils.capitalize('javascript')).toBe('Javascript');
    expect(utils.capitalize('')).toBe('');
  });

  test('reverse', () => {
    expect(utils.reverse('abc')).toBe('cba');
  });

  test('isPalindrome', () => {
    expect(utils.isPalindrome('Arara')).toBe(true);
    expect(utils.isPalindrome('teste')).toBe(false);
  });

  test('countVowels', () => {
    expect(utils.countVowels('educação')).toBeGreaterThan(0);
    expect(utils.countVowels('xyz')).toBe(0);
  });

  test('countWords', () => {
    expect(utils.countWords('  olá   mundo ')).toBe(2);
    expect(utils.countWords('')).toBe(0);
  });

  test('truncate', () => {
    expect(utils.truncate('abcdefgh', 5)).toBe('abcde...');
    expect(utils.truncate('abc', 5)).toBe('abc');
  });

  test('toCamelCase', () => {
    expect(utils.toCamelCase('meu-nome-completo')).toBe('meuNomeCompleto');
  });

  test('toSnakeCase', () => {
    expect(utils.toSnakeCase('meuNomeCompleto')).toBe('meu_nome_completo');
  });

  test('toKebabCase', () => {
    expect(utils.toKebabCase('meuNomeCompleto')).toBe('meu-nome-completo');
  });

  test('removeWhitespace', () => {
    expect(utils.removeWhitespace('a b  c')).toBe('abc');
  });

  test('isEmpty', () => {
    expect(utils.isEmpty('   ')).toBe(true);
    expect(utils.isEmpty('a')).toBe(false);
  });

  test('countOccurrences', () => {
    expect(utils.countOccurrences('banana', 'an')).toBe(2);
  });

  test('slugify', () => {
    expect(utils.slugify('Olá Mundo!')).toBe('olá-mundo');
  });

  test('padLeft', () => {
    expect(utils.padLeft('5', 3, '0')).toBe('005');
  });

  test('padRight', () => {
    expect(utils.padRight('5', 3, '0')).toBe('500');
  });

  test('repeat', () => {
    expect(utils.repeat('ab', 3)).toBe('ababab');
    expect(() => utils.repeat('ab', -1)).toThrow();
  });

  test('removeDuplicateChars', () => {
    expect(utils.removeDuplicateChars('mississippi')).toBe('misp');
  });

  test('isNumeric', () => {
    expect(utils.isNumeric('123')).toBe(true);
    expect(utils.isNumeric('abc')).toBe(false);
  });

  test('toTitleCase', () => {
    expect(utils.toTitleCase('claude sonnet 5')).toBe('Claude Sonnet 5');
  });

  test('wordFrequency', () => {
    expect(utils.wordFrequency('a b a c b a')).toEqual({ a: 3, b: 2, c: 1 });
  });
});