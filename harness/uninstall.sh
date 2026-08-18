#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PATCH_PATH="$SCRIPT_DIR/patches/deepseek-harness-47f943859b-liquid-glass.patch"
EXPECTED_PATCH_SHA256='cfda69e84180c58e9b7c8f94d9168cfc9b95f23aded0de7ae7595473408d74ae'
SKIP_INSTALL=0
HARNESS_PATH=''

while [ "$#" -gt 0 ]; do
  case "$1" in
    --skip-install) SKIP_INSTALL=1 ;;
    -*) printf 'Unknown option: %s\n' "$1" >&2; exit 2 ;;
    *)
      if [ -n "$HARNESS_PATH" ]; then printf 'Only one Harness path is accepted.\n' >&2; exit 2; fi
      HARNESS_PATH=$1
      ;;
  esac
  shift
done

if [ -z "$HARNESS_PATH" ]; then
  printf 'Usage: %s /path/to/deepseek-harness [--skip-install]\n' "$0" >&2
  exit 2
fi

HARNESS_PATH=$(CDPATH= cd -- "$HARNESS_PATH" && pwd)
if command -v sha256sum >/dev/null 2>&1; then
  ACTUAL_PATCH_SHA256=$(sha256sum "$PATCH_PATH" | awk '{print $1}')
elif command -v shasum >/dev/null 2>&1; then
  ACTUAL_PATCH_SHA256=$(shasum -a 256 "$PATCH_PATH" | awk '{print $1}')
else
  printf 'A SHA-256 utility (sha256sum or shasum) is required.\n' >&2
  exit 1
fi
if [ "$ACTUAL_PATCH_SHA256" != "$EXPECTED_PATCH_SHA256" ]; then
  printf 'Patch integrity check failed. Download a clean repository copy.\n' >&2
  exit 1
fi

if [ "$(git -C "$HARNESS_PATH" rev-parse --is-inside-work-tree 2>/dev/null || true)" != 'true' ]; then
  printf 'Not a DeepSeek Harness Git checkout: %s\n' "$HARNESS_PATH" >&2
  exit 1
fi
git -C "$HARNESS_PATH" apply --reverse --check "$PATCH_PATH"
git -C "$HARNESS_PATH" apply --reverse "$PATCH_PATH"

if [ "$SKIP_INSTALL" -ne 1 ]; then
  (cd "$HARNESS_PATH" && pnpm install)
fi

printf 'Deep Ocean Liquid Glass source changes were removed.\n'
printf 'Run pnpm run clean to remove generated build output.\n'
