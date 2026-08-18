[CmdletBinding()]
param(
  [Parameter(Mandatory = $true, Position = 0)]
  [string]$HarnessPath,
  [switch]$AllowVersionMismatch,
  [switch]$SkipInstall,
  [switch]$SkipBuild
)

$ErrorActionPreference = 'Stop'
$baseCommit = '47f943859bef60e4160492346772ded9b24f765a'
$expectedPatchSha256 = 'cfda69e84180c58e9b7c8f94d9168cfc9b95f23aded0de7ae7595473408d74ae'
$patchPath = Join-Path $PSScriptRoot 'patches\deepseek-harness-47f943859b-liquid-glass.patch'
$resolvedHarness = (Resolve-Path -LiteralPath $HarnessPath).Path

$actualPatchSha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $patchPath).Hash.ToLowerInvariant()
if ($actualPatchSha256 -ne $expectedPatchSha256) {
  throw 'Patch integrity check failed. Download a clean copy of this repository before installing.'
}

$insideWorktree = (& git -C $resolvedHarness rev-parse --is-inside-work-tree 2>$null).Trim()
if ($LASTEXITCODE -ne 0 -or $insideWorktree -ne 'true') {
  throw "Not a DeepSeek Harness Git checkout: $resolvedHarness"
}

function Invoke-HarnessGit {
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Arguments)
  & git -C $resolvedHarness @Arguments
  if ($LASTEXITCODE -ne 0) { throw "git $($Arguments -join ' ') failed" }
}

$dirty = @(& git -C $resolvedHarness status --porcelain)
if ($LASTEXITCODE -ne 0) { throw 'Unable to inspect the Harness worktree' }
if ($dirty.Count -ne 0) {
  throw 'Harness has local changes. Commit or stash them before installing so the patch cannot overwrite personal work.'
}

$head = (& git -C $resolvedHarness rev-parse HEAD).Trim()
if ($LASTEXITCODE -ne 0) { throw 'Unable to read the Harness commit' }
if ($head -ne $baseCommit -and -not $AllowVersionMismatch) {
  throw "Expected Harness $baseCommit but found $head. Check out the supported commit or pass -AllowVersionMismatch to rely on git apply --check."
}

Invoke-HarnessGit apply --check --whitespace=error-all $patchPath
Invoke-HarnessGit apply --whitespace=nowarn $patchPath

Push-Location $resolvedHarness
try {
  if (-not $SkipInstall) {
    & pnpm install
    if ($LASTEXITCODE -ne 0) { throw 'pnpm install failed; the source patch remains applied for inspection' }
  }
  if (-not $SkipBuild) {
    & pnpm run build
    if ($LASTEXITCODE -ne 0) { throw 'pnpm run build failed; the source patch remains applied for inspection' }
  }
}
finally {
  Pop-Location
}

Write-Host 'Deep Ocean Liquid Glass is installed.'
Write-Host "Start Harness with: pnpm --dir `"$resolvedHarness`" dsh web"
