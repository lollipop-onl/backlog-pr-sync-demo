import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveRedirectPath } from '../src/redirect.js';

test('next クエリで指定されたパスへリダイレクトする', () => {
  assert.equal(resolveRedirectPath({ next: '/dashboard' }), '/dashboard');
});

test('next クエリがなければログイン画面に留まる', () => {
  assert.equal(resolveRedirectPath({}), '/login');
});

test('外部ホストへのリダイレクトは受け付けない', () => {
  assert.equal(resolveRedirectPath({ next: 'https://example.com' }), '/login');
});

test('プロトコル相対 URL は外部ホストとして拒否する', () => {
  assert.equal(resolveRedirectPath({ next: '//example.com' }), '/login');
});

test('末尾のスラッシュは除去される', () => {
  assert.equal(resolveRedirectPath({ next: '/dashboard/' }), '/dashboard');
});

test('ルートパスの単独スラッシュは保持される', () => {
  assert.equal(resolveRedirectPath({ next: '/' }), '/');
});

test('クエリ付きパスでも末尾スラッシュが除去される', () => {
  assert.equal(resolveRedirectPath({ next: '/items/?page=2' }), '/items?page=2');
});
