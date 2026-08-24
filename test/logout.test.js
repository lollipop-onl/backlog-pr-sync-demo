import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveLogoutRedirectPath } from '../src/logout.js';

test('ログアウト後は既定でトップへ戻る', () => {
  assert.equal(resolveLogoutRedirectPath({}), '/');
});

test('returnTo が指定されていればそのパスへ戻る', () => {
  assert.equal(resolveLogoutRedirectPath({ returnTo: '/pricing' }), '/pricing');
});

test('外部ホストへの returnTo は無視してトップへ戻る', () => {
  assert.equal(resolveLogoutRedirectPath({ returnTo: 'https://evil.example' }), '/');
});
