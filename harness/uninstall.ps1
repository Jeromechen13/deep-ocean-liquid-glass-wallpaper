[CmdletBinding()]
param(
  [Parameter(Mandatory = $true, Position = 0)]
  [string]$HarnessPath,
  [switch]$SkipInstall
)

$ErrorActionPreference = 'Stop'
$expectedPatchSha256 = 'cfda69e84180c58e9b7c8f94d9168cfc9b95f23aded0de7ae7595473408d74ae'
$patchPath = Join-Path $PSScriptRoot 'patches\deepseek-harness-47f943859b-liquid-glass.patch'
$resolvedHarness = (Resolve-Path -LiteralPath $HarnessPath).Path

$actualPatchSha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $patchPath).Hash.ToLowerInvariant()
if ($actualPatchSha256 -ne $expectedPatchSha256) {
  throw 'Patch integrity check failed. Download a clean copy of this repository before uninstalling.'
}

$insideWorktree = (& git -C $resolvedHarness rev-parse --is-inside-work-tree 2>$null).Trim()
if ($LASTEXITCODE -ne 0 -or $insideWorktree -ne 'true') {
  throw "Not a DeepSeek Harness Git checkout: $resolvedHarness"
}

& git -C $resolvedHarness apply --reverse --check $patchPath
if ($LASTEXITCODE -ne 0) {
  throw 'The complete Liquid Glass patch cannot be reversed cleanly. Preserve local changes and resolve them before uninstalling.'
}
& git -C $resolvedHarness apply --reverse $patchPath
if ($LASTEXITCODE -ne 0) { throw 'Patch removal failed' }

if (-not $SkipInstall) {
  Push-Location $resolvedHarness
  try {
    & pnpm install
    if ($LASTEXITCODE -ne 0) { throw 'pnpm install failed after patch removal' }
  }
  finally {
    Pop-Location
  }
}

Write-Host 'Deep Ocean Liquid Glass source changes were removed.'
Write-Host 'Run pnpm run clean if you also want Harness to remove generated build output.'
